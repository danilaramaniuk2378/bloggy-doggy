import { sign } from 'jsonwebtoken';
import { IUser } from '../graphql/user/UserModel';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../config';

interface ITokers {
  accessToken: string;
  refreshToken: string;
}

export const getTokens = (user: IUser): ITokers => {
  // TODO: check count for what
  const refreshToken = sign({ userId: user.id }, REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });

  const accessToken = sign({ userId: user.id }, ACCESS_TOKEN_SECRET, {
    expiresIn: '15min',
  });

  return { accessToken, refreshToken };
};
