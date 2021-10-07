import React, { ReactNode, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import { setAccessToken } from './accessToken';
import Header from './header';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  pageConent: {
    padding: '12px',
  },
  spinner: {
    marginTop: 150,
    display: 'flex',
    justifyContent: 'center',
  },
}));

interface Props {
  children: ReactNode;
}

const App = ({ children }: Props) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URI}/refresh_token`, {
      method: 'POST',
      credentials: 'include',
    }).then(async (x) => {
      const { accessToken } = await x.json();

      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.pageConent}>{children}</div>
    </div>
  );
};

export default App;
