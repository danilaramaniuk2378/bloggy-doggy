import { Response } from 'express';

// TODO: make it work for dev and prod with https connection
export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie('jid', token, {
    httpOnly: true,
    path: '/refresh_token',
    sameSite: 'none',
    secure: true,
  });
};
