import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, LinearProgress, Typography } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { RouteComponentProps } from 'react-router-dom';
import { useRegisterMutation, MeDocument, MeQuery } from '../generated/graphql';
import { setAccessToken } from '../accessToken';

interface Values {
  email: string;
  password: string;
  username: string;
}

const SignUp = ({ history }: RouteComponentProps) => {
  // TODO: use formik set error
  const [error, setError] = useState<string | null>(null);
  const [register, { loading }] = useRegisterMutation();

  return (
    <div>
      <Typography variant="h3" component="h3">
        SIGN UP
      </Typography>
      <Formik
        initialValues={{
          email: '',
          password: '',
          username: '',
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
          const response = await register({
            variables: { options: values },
            update: (store, { data }): void => {
              if (data) {
                store.writeQuery<MeQuery>({
                  query: MeDocument,
                  data: {
                    me: data.register.user,
                  },
                });
              }
            },
          });

          if (response && response.data) {
            if (response.data?.register.errors) {
              setError(response.data.register.errors[0].message);
            } else if (response.data?.register.accessToken) {
              setAccessToken(response.data.register.accessToken);
              history.push('/');
            }
          }
        }}
      >
        {({ submitForm }) => (
          <Form>
            <Field
              component={TextField}
              name="username"
              placeholder="username"
              label="Username"
              disabled={loading}
            />
            <br />
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

export default SignUp;
