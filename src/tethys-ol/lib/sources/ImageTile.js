
import Source from 'ol/source/ImageTile.js';


const ImageTile = (options) =>{
  return new Source({
    ...options
  });
}

export default ImageTile