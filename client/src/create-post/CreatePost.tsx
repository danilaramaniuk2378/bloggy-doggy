import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField } from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';
import withHeader from '../common/hocs/with-header';
import { useCreatePostMutation } from '../generated/graphql';

const validationSchema = yup.object({
  title: yup.string().required('Title is required'),
  text: yup.string().required('Text is required'),
});

const CreatePost = ({ history }: RouteComponentProps) => {
  const [createPost, { loading }] = useCreatePostMutation();

  const formik = useFormik({
    initialValues: {
      title: '',
      text: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      await createPost({
        variables: { input: values },
      });

      history.push('/');
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="title"
          name="title"
          label="Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
          disabled={loading}
        />
        <TextField
          fullWidth
          id="text"
          name="text"
          label="Text"
          value={formik.values.text}
          onChange={formik.handleChange}
          error={formik.touched.text && Boolean(formik.errors.text)}
          helperText={formik.touched.text && formik.errors.text}
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
    </>
  );
};

export default withHeader(CreatePost, 'Create post');
