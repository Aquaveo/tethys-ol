import { useEffect } from 'react';
import { useMapContext } from '../../hooks/useMapContext';
import ImageLayer from 'ol/layer/Image.js';

import { useMap } from '../../hooks/useMap';



const ImageLayerWrapper = ({ params }) => {

    const {map} = useMapContext();
    const { addLayer, removeLayer } = useMap(map);
    
    console.log(params);
    useEffect(() => {
        if (!map) return;
        const layer = new ImageLayer({
            ...params
        });
        console.log(layer);
        addLayer(layer);
        
        return () => {
            if (!map) return;
            removeLayer(layer);
        };
    }, [map]);

};

export { ImageLayerWrapper };