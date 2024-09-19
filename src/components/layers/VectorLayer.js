import VectorLayer from 'ol/layer/Vector.js';
import { useEffect } from 'react';
import { useMapContext } from '../../hooks/useMapContext';
import { useMap } from '../../hooks/useMap';



const VectorLayer = ({ params }) => {

    const {map} = useMapContext();
    const { addLayer, removeLayer } = useMap(map);

    useEffect(() => {
        if (!map) return;
        const layer = new VectorLayer({
            ...params
        });

        addLayer(layer);
        
        return () => {
            if (!map) return;
            removeLayer(layer);
        };
    }, [map]);

};

export { VectorLayer };

