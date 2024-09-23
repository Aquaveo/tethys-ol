import {Cluster as Source} from 'ol/source';

const Cluster = (options) => {
    return new Source({
      ...options
    });
};

export default Cluster;