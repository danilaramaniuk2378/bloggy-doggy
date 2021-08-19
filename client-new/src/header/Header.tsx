import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useMeQuery, useLogoutMutation } from '../generated/graphql';
import { setAccessToken } from '../accessToken';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const { data, loading } = useMeQuery();
  const [logout, { client }] = useLogoutMutation();

  const isLoggedIn = !loading && data && data.me;

  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Rent App
        </Typography>
        {!isLoggedIn && (
          <Button component={Link} to="/sign-up" color="inherit">
            Sign Up
          </Button>
        )}
        {!isLoggedIn && (
          <Button component={Link} to="/login" color="inherit">
            Login
          </Button>
        )}
        {isLoggedIn && (
          <Button component={Link} to="/user-page" color="inherit">
            User Page
          </Button>
        )}
        {isLoggedIn && (
          <Button
            onClick={async () => {
              await logout();
              setAccessToken('');
              await client!.resetStore();
            }}
            color="inherit"
          >
            Log Out
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
