import React from "react";
import MapboxGl from "mapbox-gl";
import MapBoxGlDraw from "mapbox-gl-draw";
import "./index.css";

// Define global variables
let map;
let draw;

// Define a class component to hold our map
class Map extends React.Component {
  // Immediately the component mounts initialize mapbox
  componentDidMount() {
    //   Provide access token to use mapbox maps
    MapboxGl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

    // Init mapbox
    map = new MapboxGl.Map({
      // Define where the map should be rendered
      container: this.mapDiv,
      //   Prefered style of map
      style: "mapbox://styles/mapbox/outdoors-v11",
      //   Define long and lats to pick center
      center: [36.7394723, -1.2814369],
      //   Zoom range definition
      zoom: 12
    });

    // Init map drawing
    draw = new MapBoxGlDraw({
      displayControlsDefault: false,
      //   Controls to be used to draw over the map
      controls: {
        polygon: true,
        trash: true
      }
    });

    // Integrate draw functionality on map
    map.addControl(draw);
    // Facilitates creation of drawing
    map.on("draw.create", this.createArea);
    // Facilitate updating of points of drawing
    map.on("draw.update", this.updateArea);
    // Facilitate deletion of drawing on mapbox
    map.on("draw.delete", this.deleteArea);
  }

  //   Provides the user ability to draw over the map with polygons
  drawPolygon = points => {
    map.addLayer({
      id: "maine",
      type: "fill",
      //   Definition of polygon dataset
      source: {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: points
          }
        }
      },
      layout: {},
      //   Polygon appearance customization
      paint: {
        "fill-color": "#088",
        "fill-opacity": 0.3
      }
    });
  };

  //   Enables one to create polygon over the map
  createArea = e => {
    let data = draw.getAll();
    const polygonData = data.features[0].geometry.coordinates;
    this.drawPolygon(polygonData);
  };
  //   Enables one to update a polygon's current location over map
  updateArea = e => {
    let data = draw.getAll();
    map.removeLayer("maine").removeSource("maine");
    const polygonData = data.features[0].geometry.coordinates;
    this.drawPolygon(polygonData);
    // this.polygonDataCalc(data);
  };

  //   Enables one to delete a whole polygon from a map
  deleteArea = e => {
    let data = data.getAll();
    map.removeLayer("maine").removeLayer("maine");
  };

  render() {
    return (
      <div>
          {/* Define where the map should be rendered */}
        <div ref={e => (this.mapDiv = e)} className="map"></div>
        <div className="calculation-box">
        </div>
      </div>
    );
  }
}

export default Map;
