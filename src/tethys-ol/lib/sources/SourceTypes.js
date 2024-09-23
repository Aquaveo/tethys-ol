import OSM from './OSM';
import Vector from './Vector';
import TileArcGISRest from './TileArcGISRest';
import TileWMS from './TileWMS';
import ImageTile from './ImageTile';
import Cluster from './Cluster';
import ImageArcGISRest from './ImageArcGISRest';



const SourcesTypes = {
  "OSM": OSM,
  "Vector": Vector,
  "TileArcGISRest": TileArcGISRest,
  "TileWMS": TileWMS,
  "ImageTile": ImageTile,
  "Cluster": Cluster,
  "ImageArcGISRest": ImageArcGISRest
};


export default SourcesTypes;