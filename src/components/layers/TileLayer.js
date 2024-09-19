import TileLayer from "ol/layer/Tile";
import { useEffect } from 'react';
import { useMapContext } from '../../Map/hooks/useMapContext';
import { useMap } from '../../Map/hooks/useMap';



const TileLayer = ({ params }) => {

    const {map} = useMapContext();
    const { addLayer, removeLayer } = useMap(map);

    useEffect(() => {
        if (!map) return;
        const layer = new TileLayer({
            ...params
        });

        addLayer(layer);
        
        return () => {
            if (!map) return;
            removeLayer(layer);
        };
    }, [map]);

};

export { TileLayer };

