import React from 'react';
import _ from 'lodash';
import { v4 } from 'uuid';
import { RaisedButton, TextField } from 'material-ui';
import Map from '~/common/components/map/Map';
import { SearchMapInput, ImageUploader } from '~/common/components/inputs';
import FlatsModel from '~/common/models/axios/FlatsModel';
import AddressModel from '~/common/models/google-map/AddressModel';

import './style.less';

// TODO: rebuild validation when design is ready
class AddFlat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        ...AddressModel.addressInfoModel,
        latLng: {},
        price: '',
        photoUrls: [],
      },
      errors: {},
    };
  }

  getFlat = ({ lat, lng }) => ({
    _id: v4(),
    address: {
      latitude: String(lat),
      longitude: String(lng),
    },
  })

  setAddress = (address) => {
    this.setState({
      data: {
        ...this.state.data,
        ...address,
      },
    }, this.validate);
  }

  setPrice = (event) => {
    this.setState({
      data: {
        ...this.state.data,
        price: Number(event.target.value),
      },
    }, this.validate);
  }

  setPhotoUrls = (photoUrls) => {
    this.setState({
      data: {
        ...this.state.data,
        photoUrls,
      },
    }, this.validate);
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { errors, data } = this.state;

    this.validate();
    if (Object.keys(errors).length === 0) {
      FlatsModel.addFlat(data);
    }
  }

  validate = () => {
    const { data } = this.state;
    const errors = {};

    if (!data.price) errors.price = 'Price can\'t be blank';
    if (!data.streetNumber) errors.streetNumber = 'streetNumber can\'t be blank';
    if (!data.street) errors.street = 'street can\'t be blank';
    if (!data.city) errors.city = 'city can\'t be blank';
    if (data.photoUrls.length === 0) errors.photoUrls = 'city can\'t be empty';

    this.setState({ errors });

    return errors;
  };

  render() {
    const { data: { latLng, price }, errors } = this.state;

    return (
      <form onSubmit={this.handleFormSubmit} className="AddFlat">
        <h1>Добавить квартиру</h1>
        <SearchMapInput setAddress={this.setAddress} />
        <div className="AddFlat__map">
          <Map flats={_.isEmpty(latLng) ? [] : [this.getFlat(latLng)]} />
        </div>
        <TextField
          name="price"
          placeholder="Введите цену"
          type="number"
          errorText={errors.price}
          value={price}
          onChange={this.setPrice}
        />
        <ImageUploader
          setPhotoUrls={this.setPhotoUrls}
        />
        <RaisedButton type="submit" label="Submit" />
      </form>
    );
  }
}

export default AddFlat;
