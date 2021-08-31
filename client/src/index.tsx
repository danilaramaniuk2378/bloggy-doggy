import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider,
  InMemoryCache,
  ApolloLink,
  HttpLink,
  Observable,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { BrowserRouter, Route } from 'react-router-dom';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import Dashboard from './dashboard';
import Login from './login';
import SignUp from './sign-up';
import UserPage from './user-page';
import { getAccessToken, setAccessToken } from './accessToken';
import App from './App';
import UserRoute from './common/routes/UserRoute';
import GuestRoute from './common/routes/GuestRoute';
import ForgotPassword from './forgot-password';
import ChangePassword from './change-password';

const cache = new InMemoryCache({});

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle: any;
      Promise.resolve(operation)
        .then((oper) => {
          const accessToken = getAccessToken();
          if (accessToken) {
            oper.setContext({
              headers: {
                authorization: `bearer ${accessToken}`,
              },
            });
          }
        })
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: ApolloLink.from([
    new TokenRefreshLink({
      accessTokenField: 'accessToken',
      isTokenValidOrUndefined: () => {
        const token = getAccessToken();

        if (!token) {
          return true;
        }

        try {
          const { exp } = jwtDecode<JwtPayload>(token);

          if (exp === undefined || Date.now() >= exp * 1000) {
            return false;
          }
          return true;
        } catch {
          return false;
        }
      },
      fetchAccessToken: () =>
        fetch('http://localhost:4000/refresh_token', {
          method: 'POST',
          credentials: 'include',
        }),
      handleFetch: (accessToken) => {
        setAccessToken(accessToken);
      },
      handleError: (err) => {
        console.warn('Your refresh token is invalid. Try to relogin');
        console.error(err);
      },
    }),
    onError(({ graphQLErrors, networkError }) => {
      console.error('graphQLErrors', graphQLErrors);
      console.error('networkError', networkError);
    }),
    requestLink,
    new HttpLink({
      uri: 'http://localhost:4000/graphql',
      credentials: 'include',
    }),
  ]),
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App>
        <Route exact path="/" component={Dashboard} />
        <GuestRoute exact path="/login" component={Login} />
        <GuestRoute exact path="/sign-up" component={SignUp} />
        <GuestRoute exact path="/forgot-password" component={ForgotPassword} />
        <GuestRoute
          exact
          path="/change-password/:token"
          component={ChangePassword}
        />
        <UserRoute exact path="/user-page" component={UserPage} />
      </App>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);
