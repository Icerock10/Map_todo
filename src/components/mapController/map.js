import React, { Component } from 'react';
import {
  GoogleMap,
  Marker,
  withGoogleMap,
} from 'react-google-maps';
import '../../components/App.css';

class Map extends Component {
  constructor() {
    super();
    this.state = {
      tasks: []
    };
  }
  handleMapClick(event) {
    const newMarker = {
      position: event.latLng,
      key: Date.now()
    };
    this.setState({
      marker: newMarker
    });
  }
  render() {
    const marker = this.state.marker;
    return (
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: 48.46404935, lng: 35.04169112 }}
        onClick={this.handleMapClick.bind(this)}
      >
        {marker
          ? <Marker
              {...marker}
              onRightClick={() => console.log('clickdd', marker)}
            />
          : ''}
      </GoogleMap>
    );
  }
}
export default withGoogleMap(Map);
