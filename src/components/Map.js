import React from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import MarkerIcon from "../static/imgs/marker.png";

class Map extends React.Component {
  // Default state when a user vists a site
  state = {
    viewport: {
      width: "100vw",
      height: "100vh",
      zoom: 9,
      latitude: 42.430472,
      longitude: -123.334102
    },
    userLocation: {
        lat: 42.430472,
        long: -123.334102}
  };

  setUserLocation = () => {
    //   Allows us to get the current user's location
    navigator.geolocation.getCurrentPosition(position => {
      // Define user location to overide current app state
      let newUserLocation = {
        lat: position.coords.latitude,
        long: position.coords.longitude
      };
      //   Define the current location of user
      let newViewPort = {
        ...this.state,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        zoom: 10
      };

      //   Update our component state
      this.setState({
        viewport: newViewPort,
        userLocation: newUserLocation
      });
    });
  };

  // onViewPortChange gives the user the ability to interact with the map
  // mapboxApiAccessToken grants us access to interact with mapbox maps

  render() {
    const {
      userLocation: { long, lat }
    } = this.state;
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
          >
            {/* Couple of error handling such that if we lack the data rather than a red screen present a readable error */}
            {Object.keys(this.state.userLocation).length !== 0 ? (
              <Marker longitude={long} latitude={lat}>
                <img src={MarkerIcon} alt="marker"/>
              </Marker>
            ) : (
              <div>Empty</div>
            )}
          </ReactMapGL>
        </section>
      </div>
    );
  }
}

export default Map;
