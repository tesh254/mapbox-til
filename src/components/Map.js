import React from "react";
import ReactMapGL from "react-map-gl";

class Map extends React.Component {
  // Default state when a user vists a site
  state = {
    viewport: {
      width: "100vw",
      height: "100vh",
      zoom: 16,
      latitude: 42.430472,
      longitude: -123.334102
    }
  };
  // onViewPortChange gives the user the ability to interact with the map
  // mapboxApiAccessToken grants us access to interact with mapbox maps

  render() {
    return (
      <ReactMapGL
        onViewportChange={viewport =>
          this.setState({
            viewport
          })
        }
        {...this.state.viewport}
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
        mapboxApiAccessToken={
          process.env.REACT_APP_MAPBOX_TOKEN
        }
      ></ReactMapGL>
    );
  }
}

export default Map;
