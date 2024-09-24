import axios from 'axios';
import MapUtils from './mapUtils';
import EsriUtils from './esriUtils';

 
class MapEvents {
    constructor() {
        this.esriUtils = new EsriUtils();
        this.mapUtils = new MapUtils();
    }

    _onClickGaugeLayerHandler(
        event,
        layer,
    ){
        // make function to get the layer, and if there is then execute.
        let mapServerInfo = []
        let mapObject = event.map;
    
        let clickCoordinate = event.coordinate;
        
        const urlService = layer.getSource().getUrl() // collect mapServer URL
        const id = layer
            .getSource()
            .getParams()
            .LAYERS.replace('show:', '') // remove the visible component to just get the raw url
        
        const server = mapServerInfo.find(server => server.url === urlService) // see if server already exists in mapServerInfo
        /* Here need to do MapExport request in order to get the data of the layer */
        if (!server) {
            // Query Layer 5 
            const spatialReference= {"latestWkid":3857,"wkid":102100}
            const geometry = {"spatialReference":spatialReference ,"x":clickCoordinate[0],"y":clickCoordinate[1]}
            
            const queryLayer = {
                geometry: JSON.stringify(geometry),
                outFields:'*',
                geometryType: 'esriGeometryPoint',
                spatialRel: "esriSpatialRelIntersects",
                units:'esriSRUnit_Meter',
                distance: this.esriUtils.getDistanceByZoom(mapObject.getView().getZoom()),
                sr: `${mapObject.getView().getProjection().getCode().split(/:(?=\d+$)/).pop()}`,
                returnGeometry: true, // I don't want geometry, but you might want to display it on a 'selection layer'
                f: 'json',
                inSR:102100,
                outSR:4326
            }
            const url = new URL(`${urlService}/${id}/query`);
            url.search = new URLSearchParams(queryLayer);
            axios.get(url).then((response) => {
                console.log(response.data);
                if(response.data.features.length < 1){
                    return
                }
                const gauge_id = response.data.features[0].attributes.gaugelid
                // here make the gauge_id to change,
                // this should go to another Component

                const noaaApiUrl = `https://api.water.noaa.gov/nwps/v1/gauges/${gauge_id}/stageflow`;  // NOAA API endpoint

                axios.get(noaaApiUrl)
                .then((gaugeResponse) => {
                    console.log(gaugeResponse.data);
                    mapObject.getOverlayById('overlay-test').setPosition(clickCoordinate);
                    const xValues = gaugeResponse.data.observed.map((point) => point.validTime);
                    const primaryValues = gaugeResponse.data.observed.map((point) => point.primary);
                    const secondaryValues = gaugeResponse.data.observed.map((point) => point.secondary);
                    
                    // Process the gauge data here
                    // You can manipulate or save gaugeResponse.data depending on your need
                })
                .catch((error) => {
                    console.log('Error fetching gauge data:', error);
                });
                // end component 

                
    
            }).catch((error) => {
                console.log(error);    
            });
    
    
        }
    }

    async _getInfoFromImageLayers (
        event, 
        layers
    ) {
        for (const layer of layers) {
          const mapServerLayerName = this.mapUtils.getMapServerLayerName(layer);;
          
          if (mapServerLayerName === 'riv_gauges') {
            this._onClickGaugeLayerHandler(
                event, 
                layer
            );
          }
        }
    };

    async onClickMapEvent (
        event,
    ) {

        event.preventDefault();
        console.log('click event', event);
        let layers = this.mapUtils.getImageLayers(event);
        // console.log(layers)
        this._getInfoFromImageLayers(
            event, 
            layers, 
        )
      }

}

export default MapEvents;





