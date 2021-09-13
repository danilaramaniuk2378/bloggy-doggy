import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import Redis from 'ioredis';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import cookieParser from 'cookie-parser';
import { verify } from 'jsonwebtoken';
import UserResolver from './graphql/user/UserResolver';
import { User } from './entities/User';
import { createAccessToken, createRefreshToken } from './graphql/user/auth';
import { sendRefreshToken } from './sendRefreshToken';
import { PostResolver } from './graphql/post/PostResolver';

(async () => {
  const app = express();
  const redis = new Redis();

  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );

  app.use(cookieParser());

  app.post('/refresh_token', async (req, res) => {
    const token = req.cookies.jid;

    if (!token) {
      return res.send({ ok: false, accessToken: '' });
    }

    let payload: any = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (err) {
      console.log(err);
      return res.send({ ok: false, accessToken: '' });
    }

    const user = await User.findOne({ id: payload.userId });

    if (!user) {
      return res.send({ ok: false, accessToken: '' });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: '' });
    }

    sendRefreshToken(res, createRefreshToken(user));

    return res.send({ ok: true, accessToken: createAccessToken(user) });
  });

  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, PostResolver],
      validate: false,
    }),
    context: ({ req, res }) => {
      let userId = -1;
      const authorization = req.headers['authorization'];

      if (authorization) {
        try {
          const token = authorization.split(' ')[1];
          const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
          userId = payload.userId;
        } catch (err) {
          console.error(err);
        }
      }

      return { req, res, redis, userId };
    },
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log('express server started');
  });
})();
