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

import './index.scss';

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: new InMemoryCache({}),
  uri: 'http://localhost:4000/graphql',
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/login" component={Login} />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);
