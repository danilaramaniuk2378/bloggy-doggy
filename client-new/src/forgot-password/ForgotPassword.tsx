import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import withHeader from '../common/hocs/with-header';
import { useForgotPasswordMutation } from '../generated/graphql';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
});

const ForgotPassword = () => {
  const [complete, setComplete] = useState(false);
  const [forgotPassword, { loading }] = useForgotPasswordMutation();
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      await forgotPassword({ variables: values });
      setComplete(true);
    },
  });

  return (
    <>
      {complete ? (
        <Alert severity="info">SENT</Alert>
      ) : (
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
        </>
      )}
    </>
  );
};

export default withHeader(ForgotPassword, 'Forgot password');
