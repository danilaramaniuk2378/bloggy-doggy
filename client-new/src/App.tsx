import React, { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

interface Props {
  children: ReactNode;
}

const App = ({ children }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Rent App
          </Typography>
          <Button component={Link} to="/sign-up" color="inherit">
            Sign Up
          </Button>
          <Button component={Link} to="/login" color="inherit">
            Login
          </Button>
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
};

export default App;
