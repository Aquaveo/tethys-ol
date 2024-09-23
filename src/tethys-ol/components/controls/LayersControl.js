// LayerControl.js
import React from 'react';
import {useLayersControlContext} from './useLayersControlContext';

const LayersControl = ({ children }) => {
    const { layersVisibility, setLayerVisibility } = useLayersControlContext();
    const childArray = React.Children.toArray(children);
    console.log(childArray);
    return (
            <div className="layer-control">
                <h3>Layer Control</h3>
                <ul>
                    {childArray.map((child, index) => {
                        const layerId = child.props.layerId || `layer-${index}`;
                        const visible = child.props.visible ?? true;

                        return (
                            <li key={layerId}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={visible}
                                        onChange={() => setLayerVisibility(layerId, !visible)}
                                    />
                                    {child.props.name || `Layer ${index + 1}`}
                                </label>
                            </li>
                        );
                    })}
                </ul>
                {children}
            </div>

    );
};

export {LayersControl}
