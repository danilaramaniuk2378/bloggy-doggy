import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { RouteComponentProps } from 'react-router-dom';
import { useRegisterMutation, MeDocument, MeQuery } from '../generated/graphql';
import { setAccessToken } from '../accessToken';
import withHeader from '../common/hocs/with-header';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
  username: yup.string().required('Username is required'),
});

const SignUp = ({ history }: RouteComponentProps) => {
  const [error, setError] = useState<string | null>(null);
  const [register, { loading }] = useRegisterMutation();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      username: '',
    },
    validationSchema,
    onSubmit: async (values) => {
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
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="username"
          name="username"
          label="Username"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
          disabled={loading}
        />
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
      </form>
      <br />
      {error && <Alert severity="error">Error — {error}</Alert>}
    </>
  );
};

export default withHeader(SignUp, 'Sign up');
