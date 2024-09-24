import React from "react";

import { Map } from "../tethys-ol/providers/Map";
import Layer from "../tethys-ol/components/layers/Layer";
import Source from "../tethys-ol/lib/Source";
import Layers from "../tethys-ol/components/layers/Layers";
import Overlay from "../tethys-ol/components/overlays/Overlay";
import Overlays from "../tethys-ol/components/overlays/Overlays";
import { 
    LayerConfig, 
    ViewConfig, 
    MapConfig 
} from "./Config";

import View from "../tethys-ol/components/View";
import OverLayContentWrapper from "./OverlayContentWrapper";

const PluginMap = () => {
    
  return (

    <Map {...MapConfig} >
        <View {...ViewConfig} />
        <Layers>
            {LayerConfig.map((config, index) => {
                const { type: LayerType, props: { source: { type: SourceType, props: sourceProps }, ...layerProps } } = config;
                const source = Source({ is: SourceType, ...sourceProps });
                return (
                    <Layer 
                        key={index} 
                        is={LayerType}
                        source={source}
                        {...layerProps}
                    />
                );
            })}
        
        </Layers>
        <Overlays>
            <Overlay
                  id= "overlay-test"
                  autoPan= {{
                    animation: {
                      duration: 250,
                    },
                  }}
            >
                <OverLayContentWrapper>
                    <div>Your overlay content here</div>
                </OverLayContentWrapper>
            </Overlay>
        </Overlays>
    </Map>
  );
}

export default PluginMap


// A Component made of the following:
// A Plotly Component that takes in data, but it is pretty flexible: take data, layout, config, etc, look at what Corey did
// A Parent component that uses the Plotly component, but triggers an API call to call the data,
// We can look at this with LazyComponents, etc
// We need a provider and a store with a reducer, we probably want to keep the structure of the response from the API call

// The same will go for the Streams.
// A couple fo questions:
// How would intake do with async calls?
// How would intake do with multiple async calls?

// One More question:
// Probably need to have a single WebSocket for all the components
// check Corey's code for a possible WebSocket



// we need also a component for turning on and off the layers

// create an overlay component in the Map thing
// put a plotly graph in the overlay
// then put the overlay in the map
// edit the onclick event to show the overlay

// should we have a separate component for gauges?
// should we have a separate component for streams
// if we do should they be like this
// <NWPSRiverGauges />
// |
// |
// |
// <ImageLayerWrapper> 
//      <PopUp>
//          <PlotlyGraph /> --> this one needs to be for multiple lines or one line
//      </Popup>
// </ImageLayerWrapper>


// lib
// components
// providers
