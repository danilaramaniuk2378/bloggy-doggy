import Http from './Http';

export default class AuthModel {
  static registration({ email, username, password }) {
    return Http.post('users/signup', { email, username, password });
  }

  static login({ email, password }) {
    return Http.post('users/signin', { email, password });
  }

  static secret() {
    return Http.post('users/secret');
  }

  static logout() {
    return Http.post('users/logout');
  }
}
