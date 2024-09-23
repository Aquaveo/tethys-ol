import VectorSource from 'ol/source/Vector.js';


const Vector = (options) => {
  return new VectorSource({
    ...options
  });
};

export default Vector;

