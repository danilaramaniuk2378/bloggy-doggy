import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import passport from 'passport';
import User from '../models/user';
import config from '../config';
import {
  GOOGLE,
} from '../constants/auth';

passport.use(new GoogleStrategy(
  {
    clientID: config.GOOGLE_AUTH_CLIENT_ID,
    clientSecret: config.GOOGLE_AUTH_CLIENT_SECRET,
    callbackURL: '/api/users/auth/google/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await User.findOne({ [`${GOOGLE}.id`]: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }

      const newUser = new User({
        method: GOOGLE,
        [GOOGLE]: {
          id: profile.id,
          email: profile.emails[0].value,
        },
      });

      await newUser.save();
      return done(null, newUser);
    } catch (error) {
      return done(error, false, error.message);
    }
  }
));
