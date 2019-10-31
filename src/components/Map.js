import React from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import WifiIcon from "../static/imgs/wifi.svg";
import fetchHotSpots from "../api/fetchHotSpots";

class Map extends React.Component {
  // Default state when a user vists a site
  state = {
    viewport: {
      width: "100vw",
      height: "100vh",
      zoom: 12,
      latitude: 40.7250863,
      longitude: -73.9773608
    },
    userLocation: {
      lat: 40.7250863,
      long: -73.9773608
    },
    wifiHotSpots: []
  };

  //   Immediately the component mounts, make an API call to fetch the hotspots
  componentDidMount() {
    this.getAllHotSpots();
  }

  //   Define method to fetch all wifi hotspots and filter with the ones that are free
  getAllHotSpots = () => {
    fetchHotSpots().then(res => {
      this.setState({
        wifiHotSpots: res.data.filter(spot => {
          return spot.type === "Free";
        })
      });
    });
  };

  //   After fetching all hotspots render marker to identify them
  renderWifiMarkers = () => {
    const { wifiHotSpots } = this.state;

    return wifiHotSpots.map(spot => {
      return (
        <Marker
          key={spot.objectid}
          longitude={parseFloat(spot.longitude)}
          latitude={parseFloat(spot.latitude)}
        >
          <img src={WifiIcon} alt="marker" style={{ width: "15px" }} />
        </Marker>
      );
    });
  };

  // onViewPortChange gives the user the ability to interact with the map
  // mapboxApiAccessToken grants us access to interact with mapbox maps

  render() {
    return (
      <div className="map-holder">
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
            {/* Merkers rendered here */}
            {this.renderWifiMarkers()}
          </ReactMapGL>
        </section>
      </div>
    );
  }
}

export default Map;
