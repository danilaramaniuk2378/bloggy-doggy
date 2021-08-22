import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, LinearProgress, Typography } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { RouteComponentProps } from 'react-router-dom';
import { useLoginMutation, MeDocument, MeQuery } from '../generated/graphql';
import { setAccessToken } from '../accessToken';

interface Values {
  email: string;
  password: string;
}

const Login = ({ history }: RouteComponentProps) => {
  // TODO: use formik set error
  const [error, setError] = useState<string | null>(null);
  const [login, { loading }] = useLoginMutation();

  return (
    <div>
      <Typography variant="h3" component="h3">
        Login
      </Typography>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validate={(values) => {
          const errors: Partial<Values> = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={async (values) => {
          const response = await login({
            variables: { email: values.email, password: values.password },
            update: (store, { data }): void => {
              if (data) {
                store.writeQuery<MeQuery>({
                  query: MeDocument,
                  data: {
                    me: data.login.user,
                  },
                });
              }
            },
          });

          if (response && response.data) {
            if (response.data?.login.errors) {
              setError(response.data.login.errors[0].message);
            } else if (response.data?.login.accessToken) {
              setAccessToken(response.data.login.accessToken);
              history.push('/');
            }
          }
        }}
      >
        {({ submitForm }) => (
          <Form>
            <Field
              component={TextField}
              name="email"
              type="email"
              label="Email"
              disabled={loading}
            />
            <br />
            <Field
              component={TextField}
              type="password"
              label="Password"
              name="password"
              disabled={loading}
            />
            {loading && <LinearProgress />}
            <br />
            <Button
              variant="contained"
              color="primary"
              disabled={loading}
              onClick={submitForm}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
      {error && <div>{error}</div>}
    </div>
  );
};

export default Login;
