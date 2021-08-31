import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { RouteComponentProps, useParams } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import withHeader from '../common/hocs/with-header';
import {
  useChangePasswordMutation,
  MeDocument,
  MeQuery,
} from '../generated/graphql';
import { setAccessToken } from '../accessToken';

const validationSchema = yup.object({
  newPassword: yup.string().required('Password is required'),
});

interface Params {
  token: string;
}

const ChangePassword = ({ history }: RouteComponentProps) => {
  const params = useParams<Params>();
  const [changePassword, { loading }] = useChangePasswordMutation();
  const [error, setError] = useState<string | null>(null);
  const formik = useFormik({
    initialValues: {
      newPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const response = await changePassword({
        variables: {
          newPassword: values.newPassword,
          token: params.token,
        },
        update: (store, { data }): void => {
          if (data) {
            store.writeQuery<MeQuery>({
              query: MeDocument,
              data: {
                me: data.changePassword.user,
              },
            });
          }
        },
      });

      if (response && response.data) {
        if (response.data?.changePassword.errors) {
          setError(response.data.changePassword.errors[0].message);
        } else if (response.data?.changePassword.accessToken) {
          setAccessToken(response.data.changePassword.accessToken);
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
          id="newPassword"
          name="newPassword"
          label="New password"
          type="password"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          error={
            formik.touched.newPassword && Boolean(formik.errors.newPassword)
          }
          helperText={formik.touched.newPassword && formik.errors.newPassword}
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

export default withHeader(ChangePassword, 'Change password');
