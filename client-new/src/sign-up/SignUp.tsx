import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, LinearProgress, Typography } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { RouteComponentProps } from 'react-router-dom';
import { useRegisterMutation } from '../generated/graphql';

interface Values {
  email: string;
  password: string;
}

const SignUp = ({ history }: RouteComponentProps) => {
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
          await register({
            variables: { email: values.email, password: values.password },
          });

          history.push('/');
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
    </div>
  );
};

export default SignUp;
