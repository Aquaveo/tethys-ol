import { Overlay as OlOverlay } from 'ol';
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useMapContext } from '../../hooks/useMapContext';

const Overlay = (props) => {
  const { map } = useMapContext();  // Custom map context
  const overlayRef = useRef(null);  // Ref to the DOM element
  const olOverlayRef = useRef(null); // Ref to the OpenLayers Overlay instance

  useEffect(() => {
    if (!map || !overlayRef.current) return;

    // Create the OpenLayers Overlay
    olOverlayRef.current = new OlOverlay({
      element: overlayRef.current,
      autoPan: props.autoPan,
      id: props.id,  // Assign the ID here
      // ... other props as needed
    });

    map.addOverlay(olOverlayRef.current);

    // Cleanup function to remove the overlay from the map on unmount
    return () => {
      if (!map) return;
      map.removeOverlay(olOverlayRef.current);
    };
  }, [map, overlayRef.current]);

  return createPortal(
    <div id={props.id} className="modal-overlay" ref={overlayRef}>
      {props.children}
    </div>,
    document.body // Render the overlay into the body or another container
  );
};

export default Overlay;