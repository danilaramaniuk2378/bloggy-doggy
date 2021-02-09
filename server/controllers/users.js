import User from '../models/user';
import RefreshToken from '../models/refreshToken';
import { getTokens } from '../helpers/auth';
import {
  LOCAL,
} from '../constants/auth';

const signUp = async (req, res) => {
  const { email, password, username } = req.body;
  const foundUser = await User.findOne({ [`${LOCAL}.email`]: email });

  if (foundUser) {
    return res.status(403).json({ error: 'Email is already in use' });
  }

  const newUser = new User({
    method: LOCAL,
    [LOCAL]: { email, password, username },
  });
  await newUser.save();

  const tokens = await getTokens(newUser);
  return res.status(200).json(tokens);
};

const signIn = async (req, res) => {
  const tokens = await getTokens(req.user);
  res.status(200).json(tokens);
};

const logout = async (req, res) => {
  const { _id: userId } = req.user;
  await RefreshToken.find({ userId }).remove().exec();
  res.status(200).json({ success: true });
};

const refresh = async (req, res) => {
  const { refreshToken } = req.body;
  const dbToken = await RefreshToken.findOne({ token: refreshToken });

  if (dbToken.length === null) {
    return res.status(401).json({ error: 'Not valid refresh token' });
  }

  await RefreshToken.find({ token: refreshToken }).remove().exec();

  const user = await User.findOne({ _id: dbToken.userId });
  const tokens = await getTokens(user);
  return res.status(200).json(tokens);
};

const redirect = async (req, res) => {
  const { token, refreshToken } = await getTokens(req.user);
  return res.redirect(`/?token=${token}&refreshToken=${refreshToken}`);
};

export default {
  signUp,
  signIn,
  logout,
  refresh,
  redirect,
};
