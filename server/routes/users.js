import express from 'express';
import passport from 'passport';
import {
  validateBody,
  schemas,
} from '../helpers/validation';
import UsersController from '../controllers/users';

const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });
const app = express.Router();

app.post(
  '/signup',
  validateBody(schemas.signUpSchema),
  UsersController.signUp,
);

app.post(
  '/signin',
  validateBody(schemas.signInSchema),
  passportSignIn,
  UsersController.signIn,
);

app.post('/logout', passportJWT, UsersController.logout);
app.post('/refresh', UsersController.refresh);
app.post('/secret', passportJWT, (req, res) => res.status(200).json({ success: 'secret' }));

app.get('/auth/google-login', passport.authenticate('google', { scope: ['email profile'] }));
app.get(
  '/auth/google/callback',
  passport.authenticate('google', { session: false }),
  UsersController.redirect,
);

app.get('/auth/facebook-login', passport.authenticate('facebook', { scope: ['email'] }));
app.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { session: false }),
  UsersController.redirect,
);

export default app;
