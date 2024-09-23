import {TileWMS as Source} from "ol/source";


const TileWMS = (options) => {
  return new Source({
    ...options
  });
};

export default TileWMS;