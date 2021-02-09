import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Header from './header/Header';
import Main from './main/Main';
import FlatDetails from './flat-details/FlatDetails';
import Login from './login/Login';
import Registration from './registration/Registration';
import GuestRoute from './common/routes/GuestRoute';
import UserRoute from './common/routes/UserRoute';
import UserProfile from './user-profile/UserProfile';
import ForgotPassword from './forgot-password/ForgotPassword';
import RecoveryPassword from './forgot-password/RecoveryPassword';
import AddFlat from './add-flat/AddFlat';
import store from './store';
import { login } from './actions/auth';

import './app.less';

const checkSocialSignup = (event) => {
  if (event.data.social) {
    store.dispatch(login(event.data.token, event.data.refreshToken));
  }
};
window.addEventListener('message', checkSocialSignup, false);

if (window.opener) {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  const refreshToken = params.get('refreshToken');
  window.opener.postMessage(
    { social: true, token, refreshToken },
    window.opener.origin,
  );
  window.close();
}

const App = ({ location }) => (
  <div className="App">
    <Header />
    <Route location={location} path="/" exact component={Main} />
    <Route location={location} path="/flat-details/:id" exact component={FlatDetails} />
    <GuestRoute location={location} path="/login" exact component={Login} />
    <GuestRoute location={location} path="/registration" exact component={Registration} />
    <UserRoute location={location} path="/user-profile/:userId" exact component={UserProfile} />
    <UserRoute location={location} path="/add-flat" exact component={AddFlat} />
    <GuestRoute location={location} path="/forgot-password" exact component={ForgotPassword} />
    <GuestRoute location={location} path="/forgot-password/:recoveryId" exact component={RecoveryPassword} />
  </div>
);


App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default App;
