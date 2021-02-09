import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'material-ui';
import AddressModel from '~/common/models/google-map/AddressModel';

class SearchMapInput extends Component {
  static propTypes = {
    setAddress: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      address: '',
    };
  }

  componentDidMount() {
    const options = {
      types: ['address'],
    };

    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      options,
    );
    this.autocomplete.setComponentRestrictions({ country: ['BY'] });
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
  }

  handlePlaceSelect = () => {
    const { setAddress } = this.props;
    const addressObject = this.autocomplete.getPlace();
    const address = addressObject.address_components;

    if (address) {
      this.setState({ address: addressObject.formatted_address });
      const latLngLocation = addressObject.geometry.location;
      const addressInfo = AddressModel.getAddressInfo(address);

      setAddress({
        latLng: {
          lat: latLngLocation.lat(),
          lng: latLngLocation.lng(),
        },
        ...addressInfo,
      });
    }
  }

  handleChange = (event) => {
    this.setState({ address: event.target.value });
  }

  render() {
    return (
      <TextField
        id="autocomplete"
        value={this.state.address}
        onChange={this.handleChange}
      />
    );
  }
}

export default SearchMapInput;
