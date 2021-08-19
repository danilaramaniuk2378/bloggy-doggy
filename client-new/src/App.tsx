import React, { ReactNode, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { setAccessToken } from './accessToken';
import Header from './header';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

interface Props {
  children: ReactNode;
}

const App = ({ children }: Props) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/refresh_token', {
      method: 'POST',
      credentials: 'include',
    }).then(async (x) => {
      const { accessToken } = await x.json();

      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div className={classes.root}>
      <Header />
      {children}
    </div>
  );
};

export default App;
