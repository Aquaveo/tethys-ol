import React, { useEffect, useRef } from 'react';
import { Overlay } from 'ol';

const MapOverlay = ({ map, position, elementId, autoPan = true, stopEvent = true, className = 'ol-overlay-container' }) => {
    const overlayRef = useRef(null);

    useEffect(() => {
        if (!map) return;

        // Create an OpenLayers overlay
        const overlay = new Overlay({
            element: document.getElementById(elementId),
            autoPan: autoPan,
            stopEvent: stopEvent,
        });

        // Add the overlay to the map
        map.addOverlay(overlay);
        overlayRef.current = overlay;

        // Clean up overlay when component is unmounted
        return () => {
            map.removeOverlay(overlay);
        };
    }, [map, elementId, autoPan, stopEvent]);

    useEffect(() => {
        if (overlayRef.current && position) {
            // Set the position of the overlay
            overlayRef.current.setPosition(position);
        }
    }, [position]);

    return null;
};

export default MapOverlay;