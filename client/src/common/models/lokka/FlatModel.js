import client from './client';

export default class FlatModel {
  static getAllFlats() {
    return client().query(`
      {
        allFlats {
          _id
          photoUrls
          price
          address {
            latitude
            longitude
          }
        }
      }
    `);
  }

  static getFlatById(_id) {
    const query = `
      {
        getFlat(_id: "${_id}") {
          photoUrls
        }
      }
    `;

    return client().query(query, { _id });
  }
}
