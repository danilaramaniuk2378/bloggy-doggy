import axios from 'axios';
import store from '~/store';
import { login } from '~/actions/auth';

const wrapUrlToProd = url => (process.env.NODE_ENV === 'production'
  ? `/api/${url}`
  : `http://localhost:3000/${url}`);

class Http {
  constructor() {
    this.client = axios.create();
    this.refreshRequest = null;

    this.client.interceptors.request.use(
      (config) => {
        if (!localStorage.token) {
          return config;
        }

        const newConfig = {
          headers: {},
          ...config,
        };

        newConfig.headers.authorization = localStorage.token;
        return newConfig;
      },
      e => Promise.reject(e),
    );

    this.client.interceptors.response.use(
      r => r,
      async (error) => {
        if (
          !localStorage.refreshToken ||
          error.response.status !== 401 ||
          error.config.retry
        ) {
          throw error;
        }

        if (!this.refreshRequest) {
          this.refreshRequest = this.client.post(wrapUrlToProd('users/refresh'), {
            refreshToken: localStorage.refreshToken,
          });
        }

        const { data } = await this.refreshRequest;
        this.refreshRequest = null;
        store.dispatch(login(data.token, data.refreshToken));
        const newRequest = {
          ...error.config,
          retry: true,
        };

        return this.client(newRequest);
      },
    );
  }

  get(path) {
    return this.client.get(wrapUrlToProd(path));
  }

  patch(path, payload) {
    return this.client.request({
      method: 'PATCH',
      url: wrapUrlToProd(path),
      responseType: 'json',
      data: payload,
    });
  }

  post(path, payload) {
    return this.client.request({
      method: 'POST',
      url: wrapUrlToProd(path),
      responseType: 'json',
      data: payload,
    });
  }
}

export default new Http();
