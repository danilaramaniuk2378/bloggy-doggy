import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField } from '@material-ui/core';
import withHeader from '../common/hocs/with-header';

const validationSchema = yup.object({
  password: yup.string().required('Password is required'),
});

const ChangePassword = () => {
  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="password"
          name="password"
          label="New password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          disabled={false}
        />
        <br /> <br />
        <Button
          disabled={false}
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
  );
};

export default withHeader(ChangePassword, 'Change password');
