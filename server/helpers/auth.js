import JWT from 'jsonwebtoken';
import uuid from 'uuid/v4';
import config from '../config';
import RefreshToken from '../models/refreshToken';
import {
  LOCAL,
  GOOGLE,
  FACEBOOK,
} from '../constants/auth';

export const getTokens = async user => {
  const newRefreshToken = uuid();

  await RefreshToken.findOneAndUpdate(
    { userId: user.id },
    {
      token: newRefreshToken,
      userId: user.id,
    },
    { upsert: true },
  );

  let userInfo = null;

  if (user.method === LOCAL) {
    const { _id, [LOCAL]: { username, email }, isAdmin } = user;
    userInfo = { _id, username, email, isAdmin };
  }

  if (user.method === GOOGLE || user.method === FACEBOOK) {
    const { _id, [user.method]: { email }, isAdmin } = user;
    userInfo = { _id, email, isAdmin };
  }

  return {
    token: JWT.sign({
      iss: 'cdam',
      sub: user.id,
      user: userInfo,
    }, config.JWT_SECRET, { expiresIn: '15m' }),
    refreshToken: newRefreshToken,
  };
};
