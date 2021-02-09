import FacebookStrategy from 'passport-facebook';
import passport from 'passport';
import config from '../config';
import User from '../models/user';
import {
  FACEBOOK,
} from '../constants/auth';

passport.use(new FacebookStrategy(
  {
    clientID: config.FACEBOOK_AUTH_CLIENT_ID,
    clientSecret: config.FACEBOOK_AUTH_CLIENT_SECRET,
    profileFields: ['id', 'name', 'email'],
    callbackURL: '/api/users/auth/facebook/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await User.findOne({ [`${FACEBOOK}.id`]: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }

      const newUser = new User({
        method: FACEBOOK,
        [FACEBOOK]: {
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
