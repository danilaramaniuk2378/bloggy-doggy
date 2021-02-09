import Http from './Http';

export default class FlatsModel {
  static addFlat(data) {
    return Http.post('flats/add-flat', data);
  }
}
