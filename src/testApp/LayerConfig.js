
// Array of layer configurations
const layerConfigs = [
    {
      type: "WebGLTile",
      props: {
        source:{
          type: "ImageTile",
          props:{
            url: 'https://server.arcgisonline.com/arcgis/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
            attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer">ArcGIS</a>'
          }
        }
      }
    },
    {
      type: "ImageLayer",
      props: {
        source:{
          type: "ImageArcGISRest",
          props:{
            url: 'https://mapservices.weather.noaa.gov/eventdriven/rest/services/water/riv_gauges/MapServer',
            params: {
              LAYERS: "show:0",
              layerDefs: JSON.stringify({ "0": "status = 'action' or status='minor' or status='moderate' or status='major'" })
            }
          }
        }
      }
    },

    {
      type: "ImageLayer",
      props: {
        source:{
          type: "ImageArcGISRest",
          props:{
            url: 'https://maps.water.noaa.gov/server/rest/services/reference/static_nwm_flowlines/MapServer',
            params: {
              LAYERS: "show:0"
            }
          }
        },
        visible: false
      }
    }
];

  

export { layerConfigs };