import _ from 'lodash';

class AddressModel {
  constructor() {
    this.addressInfoModel = {
      streetNumber: null,
      street: null,
      city: null,
    };

    this.bundleInfoModelWithGoogle = {
      street_number: 'streetNumber',
      route: 'street',
      locality: 'city',
    };
  }

  getAddressInfo = (address) => {
    const googleKeysModel = Object.keys(this.bundleInfoModelWithGoogle);

    return address.reduce((memo, { types, short_name }) => {
      const intersection = _.intersection(googleKeysModel, types);

      if (intersection.length !== 0) {
        return {
          ...memo,
          [this.bundleInfoModelWithGoogle[intersection[0]]]: short_name,
        };
      }

      return memo;
    }, this.addressInfoModel);
  }
}

export default new AddressModel;
