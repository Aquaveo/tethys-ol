import {TileArcGISRest as Source} from "ol/source";


const TileArcGISRest = (options) => {
  return new Source({
    ...options
  });
};

export default TileArcGISRest;

