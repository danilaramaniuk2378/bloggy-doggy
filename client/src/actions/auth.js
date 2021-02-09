import jwtDecode from 'jwt-decode';
import { USER_LOGGED_IN, USER_LOGGED_OUT } from '~/types';
import AuthModel from '~/common/models/axios/AuthModel';

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user,
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT,
});

export const login = (token, refreshToken) => (dispatch) => {
  localStorage.token = token;
  localStorage.refreshToken = refreshToken;
  dispatch(userLoggedIn(jwtDecode(token).user));
};

export const logout = () => async (dispatch) => {
  // TODO: error handling in app
  await AuthModel.logout();
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  dispatch(userLoggedOut());
};

