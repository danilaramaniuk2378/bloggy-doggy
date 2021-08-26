/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  wrapper: {
    maxWidth: 400,
    margin: 'auto',
  },
}));

function withHeader<P>(
  WrappedComponent: React.ComponentType<P>,
  title: string
) {
  const ComponentWithExtraInfo = (props: P) => {
    const classes = useStyles();

    return (
      <div className={classes.wrapper}>
        <Typography variant="h3" component="h3">
          {title}
        </Typography>
        <WrappedComponent {...props} />
      </div>
    );
  };

  return ComponentWithExtraInfo;
}

export default withHeader;
