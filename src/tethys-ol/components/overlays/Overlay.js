import { Overlay as OlOverlay } from 'ol';
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useMapContext } from '../../hooks/useMapContext';

const Overlay = (props) => {
  const { map } = useMapContext();  // Custom map context
  const overlayRef = useRef(null);  // Ref to the DOM element
  // if you need to access the overlay instance within this component then create a ref to it
  // const olOverlayRef = useRef(null); // Ref to the OpenLayers Overlay instance
  // olOverlayRef.current
  useEffect(() => {
    if (!map || !overlayRef.current) return;

    const overlay = new OlOverlay({
      element: overlayRef.current,
      ...props
    });

    map.addOverlay(overlay);

    // Cleanup function to remove the overlay from the map on unmount
    return () => {
      if (!map) return;
      map.removeOverlay(overlay);
    };
  }, [map]);

  return createPortal(
    <div className="modal-overlay" ref={overlayRef}>
      {props.children}
    </div>,
    document.body // Render the overlay into the body or a specific container
  );
};

export default Overlay;