/* eslint-disable react/jsx-props-no-spreading */
import React, { ComponentType } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getAccessToken } from '../../accessToken';

type Props = {
  component: ComponentType<any>;
  [x: string]: any;
};

const GuestRoute = ({ component: Component, ...rest }: Props) => (
  <Route
    {...rest}
    render={(props) => {
      if (getAccessToken()) {
        return <Redirect to="/" />;
      }

      return <Component {...props} />;
    }}
  />
);

export default GuestRoute;
