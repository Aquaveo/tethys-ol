import React from "react";

import { Map } from "../tethys-ol/providers/Map";
import Layer from "../tethys-ol/components/layers/Layer";
import Source from "../tethys-ol/lib/Source";
import Layers from "../tethys-ol/components/layers/Layers";

import { 
    LayerConfig, 
    ViewConfig, 
    MapConfig 
} from "./Config";

import View from "../tethys-ol/components/View";


const PluginMap = () => {
    
  return (
    <Map
        {...MapConfig}
    >
        <View
            {...ViewConfig}
        />

        <Layers>
            {LayerConfig.map((config, index) => {
                const { type: LayerType, props: { source: { type: SourceType, props: sourceProps }, ...layerProps } } = config;
                const source = Source({ is: SourceType, ...sourceProps });
                return (
                    <Layer 
                        key={index} 
                        is={LayerType}
                        source={source}
                        {...layerProps}
                    />
                );
            })}
        </Layers>

    </Map>
  );
}

export default PluginMap




// import { XYZArcGISSource, ImageArcGISRestSource } from '../tethys-ol/components/sources';
// import {WebGLTile} from '../tethys-ol/components/layers/WebGLTile';
// import {ImageLayerWrapper} from '../tethys-ol/components/layers/ImageLayer';


// we need also a component for turning on and off the layers

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






// const GaugesArcgisLayerSource = ImageArcGISRestSource({
//     url: 'https://mapservices.weather.noaa.gov/eventdriven/rest/services/water/riv_gauges/MapServer',
//     params: {
//         LAYERS:"show:0",
//         layerDefs: JSON.stringify({"0":"status = 'action' or status='minor' or status='moderate' or status='major'"})
//     }
// })

// const StreamArcgisLayerSource = ImageArcGISRestSource({
//     url: 'https://mapservice.nohrsc.noaa.gov/arcgis/rest/services/national_water_model/NWM_Stream_Analysis/MapServer',
//     params: {
//         LAYERS:"show:0,7,14,21"
//     }
// })

// const StaticFlowLines = ImageArcGISRestSource({
//     url: 'https://maps.water.noaa.gov/server/rest/services/reference/static_nwm_flowlines/MapServer',
//     params: {
//         LAYERS:"show:0"
//     }
// })


// const BaseMapLayerSource = XYZArcGISSource({
//     url: 'https://server.arcgisonline.com/arcgis/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
//     attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/</RMap>rest/services/World_Topo_Map/MapServer">ArcGIS</a>'
// });

