import TileArcGISRest from "ol/source/TileArcGISRest";
import OSM from 'ol/source/OSM';
import ImageArcGISRest from "ol/source/ImageArcGISRest";
import TileWMS from "ol/source/TileWMS";
import VectorSource from 'ol/source/Vector.js';
import Cluster from 'ol/source/Cluster';
import Source from 'ol/source/ImageTile.js';


const ClusterSource = (options) => {
  return new Cluster({
    ...options
  });
};

const TileArcGISRestSource = (options) => {
  return new TileArcGISRest({
    ...options
  });
};

const OSMSource = () => {
  return new OSM();
};

const ImageArcGISRestSource = (options) => {
  return new ImageArcGISRest({
    ...options
  });
};

const TileWMSSource = (options) => {
  return new TileWMS({
    ...options
  });
};

const VectorSourceWrapper = (options) => {
  return new VectorSource({
    ...options
  });
};

const XYZArcGISSource = (options) =>{
  return new Source({
    ...options
  });
}

export { 
  ClusterSource, 
  TileArcGISRestSource, 
  OSMSource, 
  ImageArcGISRestSource, 
  TileWMSSource, 
  VectorSourceWrapper,
  XYZArcGISSource
}