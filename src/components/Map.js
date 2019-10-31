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

  setUserLocation = () => {
    //   Allows us to get the current user's location
    navigator.geolocation.getCurrentPosition(position => {
        console.log(position.coords, '>>>>>>>>>>>>>>>>')
      //   Define the current location of user
      let newViewPort = {
        ...this.state,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        zoom: 12
      };

      //   Update our component state
      this.setState({
        viewport: newViewPort
      });
    });
  };

  // onViewPortChange gives the user the ability to interact with the map
  // mapboxApiAccessToken grants us access to interact with mapbox maps

  render() {
    return (
      <div className="map-holder">
        <button onClick={this.setUserLocation}>find me</button>
        <section className="map">
          <ReactMapGL
            onViewportChange={viewport =>
              this.setState({
                viewport
              })
            }
            {...this.state.viewport}
            mapStyle="mapbox://styles/mapbox/outdoors-v11"
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          ></ReactMapGL>
        </section>
      </div>
    );
  }
}

export default Map;
