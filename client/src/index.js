
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import decode from 'jwt-decode';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './App';
import store from './store';
import './index.less';
import { userLoggedIn } from './actions/auth';


if (localStorage.token) {
  const { user } = decode(localStorage.token);
  store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <MuiThemeProvider>
        <Route component={App} />
      </MuiThemeProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);
