import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { RouteComponentProps, Link } from 'react-router-dom';
import { useLoginMutation, MeDocument, MeQuery } from '../generated/graphql';
import { setAccessToken } from '../accessToken';
import withHeader from '../common/hocs/with-header';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});

const Login = ({ history }: RouteComponentProps) => {
  const [error, setError] = useState<string | null>(null);
  const [login, { loading }] = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
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
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          disabled={loading}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          disabled={loading}
        />
        <br /> <br />
        <Button
          disabled={loading}
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
        >
          Submit
        </Button>
        <Typography>
          <Link to="/forgot-password">Forgot password?</Link>
        </Typography>
      </form>
      <br />
      {error && <Alert severity="error">Error — {error}</Alert>}
    </>
  );
};

export default withHeader(Login, 'Login');
