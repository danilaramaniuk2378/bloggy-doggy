import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/client';
import { BrowserRouter, Route } from 'react-router-dom';
import Dashboard from './dashboard';
import Login from './login';
import SignUp from './sign-up';
import App from './App';

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: new InMemoryCache({}),
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/sign-up" component={SignUp} />
      </App>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);
