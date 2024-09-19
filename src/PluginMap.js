import React from "react";
import { fromLonLat } from "ol/proj";
import "ol/ol.css";
import { Map } from "./providers/Map";

import { XYZArcGISSource, ImageArcGISRestSource } from './components/sources';
import {WebGLTile} from './components/layers/WebGLTile';
import {ImageLayerWrapper} from './components/layers/ImageLayer';
import TileArcGISRest from "ol/source/TileArcGISRest";


const center = fromLonLat([2.364, 48.82]);


const GaugesArcgisLayerSource = ImageArcGISRestSource({
    url: 'https://mapservices.weather.noaa.gov/eventdriven/rest/services/water/riv_gauges/MapServer',
    params: {
        LAYERS:"show:0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15"
    }
})

const StreamArcgisLayerSource = ImageArcGISRestSource({
    url: 'https://mapservice.nohrsc.noaa.gov/arcgis/rest/services/national_water_model/NWM_Stream_Analysis/MapServer',
    params: {
        LAYERS:"show:0,7,14,21"
    }
})


const BaseMapLayerSource = XYZArcGISSource({
    url: 'https://server.arcgisonline.com/arcgis/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/</RMap>rest/services/World_Topo_Map/MapServer">ArcGIS</a>'
});



const PluginMap = () => {
  return (
    <Map
        center={center}
        zoom={10}
        className="ol-map"
        width="100%"
        height="100vh"
    >
        <WebGLTile 
            params={
                {source: BaseMapLayerSource}
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