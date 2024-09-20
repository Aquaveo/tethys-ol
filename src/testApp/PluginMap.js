import React from "react";
import { fromLonLat } from "ol/proj";
import "ol/ol.css";
import { Map } from "../providers/Map";
import { XYZArcGISSource, ImageArcGISRestSource } from '../components/sources';
import {WebGLTile} from '../components/layers/WebGLTile';
import {ImageLayerWrapper} from '../components/layers/ImageLayer';
import MapEvents from "./mapEvents";


const mapEvents = new MapEvents();

const center = fromLonLat([-110.875, 37.345]);


const GaugesArcgisLayerSource = ImageArcGISRestSource({
    url: 'https://mapservices.weather.noaa.gov/eventdriven/rest/services/water/riv_gauges/MapServer',
    params: {
        LAYERS:"show:0",
        layerDefs: JSON.stringify({"0":"status = 'action' or status='minor' or status='moderate' or status='major'"})
    }
})

const StreamArcgisLayerSource = ImageArcGISRestSource({
    url: 'https://mapservice.nohrsc.noaa.gov/arcgis/rest/services/national_water_model/NWM_Stream_Analysis/MapServer',
    params: {
        LAYERS:"show:0,7,14,21"
    }
})

const StaticFlowLines = ImageArcGISRestSource({
    url: 'https://maps.water.noaa.gov/server/rest/services/reference/static_nwm_flowlines/MapServer',
    params: {
        LAYERS:"show:0"
    }
})


const BaseMapLayerSource = XYZArcGISSource({
    url: 'https://server.arcgisonline.com/arcgis/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/</RMap>rest/services/World_Topo_Map/MapServer">ArcGIS</a>'
});



// create an overlay component in the Map thing
// put a plotly graph in the overlay
// then put the overlay in the map
// edit the onclick event to show the overlay

// should we have a separate component for gauges?
// should we have a separate component for streams
// if we do should they be like this
// <NWPSRiverGauges />
// |
// |
// |
// <ImageLayerWrapper> 
//      <PopUp>
//          <PlotlyGraph /> --> this one needs to be for multiple lines or one line
//      </Popup>
// </ImageLayerWrapper>


// lib
// components
// providers


const PluginMap = () => {
    
  return (
    <Map
        center={center}
        zoom={5}
        className="ol-map"
        width="100%"
        height="100vh"
        events={{
            click: (evt)=>{
                mapEvents.onClickMapEvent(evt)
            }
        }}
    >
        <WebGLTile 
            params={
                {source: BaseMapLayerSource}
            } 
        />
        <ImageLayerWrapper 
            params={
                {source: StaticFlowLines}
            }
        />
        <ImageLayerWrapper 
            params={
                {source: GaugesArcgisLayerSource}
            } 
        />
    </Map>
  );
}

export {PluginMap}