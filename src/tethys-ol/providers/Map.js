import React, { useEffect , useState, useRef } from 'react';
import MapContext from '../contexts/MapContext';
import { View, Map as OlMap } from 'ol';

export const Map = ({ children, ...props}) => {

  const mapRef = useRef();
  const [map, setMap] = useState(null);

  useEffect(() => {
    let options = {
      view: new View({ 
        zoom: props.resolution === undefined ? props.zoom : undefined, 
        center: props.center,
        extent: props.extent,
        resolution: props.resolution,
        minResolution: props.minResolution,
        maxResolution: props.maxResolution,
        constrainResolution: props.constrainResolution,
        minZoom: props.minZoom,
        maxZoom: props.maxZoom,
        enableRotation: props.enableRotation,
        constrainRotation: props.constrainRotation
      }),
      layers: [],
      controls: [],
      overlays: []
    };
    
    let mapObject = new OlMap(options);

    console.log(props.events)
    mapObject.on('click', props.events.click);

    mapObject.setTarget(mapRef.current);
    setMap(mapObject);

    return () => mapObject.setTarget(undefined);

  }, []);

  return (
    <MapContext.Provider value={{ map }}>
        <div 
          ref={mapRef} 
          className= {props.className}
          style={{width: props.width, height: props.height}}
        >
          {children}
        </div>
    </MapContext.Provider>

  );
};