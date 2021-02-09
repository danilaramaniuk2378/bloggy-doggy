import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import './style.less';

const PointComponent = ({ text = '' }) => (
  <div
    className="PointComponent"
  >
    {text}
  </div>
);

PointComponent.propTypes = {
  text: PropTypes.string,
};

PointComponent.defaultProps = {
  text: '',
};

const MINSK = {
  lat: 53.902510,
  lng: 27.561471,
  zoom: 11,
};

class Map extends Component {
  static propTypes = {
    center: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
    }),
    zoom: PropTypes.number,
    flats: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string,
      address: PropTypes.shape({
        latitude: PropTypes.string,
        longitude: PropTypes.string,
      }),
    })),
  };

  static defaultProps = {
    center: { lat: MINSK.lat, lng: MINSK.lng },
    zoom: MINSK.zoom,
    flats: [],
  };

  render() {
    const { center, zoom, flats } = this.props;

    return (
      <GoogleMapReact
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {
          flats.map(item => (<PointComponent
            key={item._id}
            lat={item.address.latitude}
            lng={item.address.longitude}
          />))
        }
      </GoogleMapReact>
    );
  }
}

export default Map;
