import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import { verify } from 'jsonwebtoken';
import User from './graphql/user/UserModel';
import { getTokens } from './helpers/get-tokens';
import { connectDatabase } from './database';
import { FE_URL, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from './config';
import globalResolvers from './graphql/GlobalResolvers';
import globalQuery from './graphql/TypeDefinitions';

(async () => {
  try {
    const info = await connectDatabase();
    console.log(`Connected to mongodb 🍃 at ${info.host}:${info.port}/${info.name}`);
  } catch (error) {
    console.error('Unable to connect to database');
    process.exit(1);
  }

  const app = express();

  const corsOptions = {
    origin: FE_URL,
    credentials: true,
  };

  app.use(cors(corsOptions));
  app.use(cookieParser());

  app.use(async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies['refresh-token'];
    const accessToken = req.cookies['access-token'];

    if (!refreshToken && !accessToken) {
      return next();
    }

    try {
      const data = verify(accessToken, ACCESS_TOKEN_SECRET) as any;
      // @ts-ignore
      req.user = data.userId;
      return next();
    } catch (error) {
      console.log(error);
    }

    if (!refreshToken) {
      return next();
    }

    let data;

    try {
      data = verify(refreshToken, REFRESH_TOKEN_SECRET) as any;
    } catch {
      return next();
    }

    const user = await User.findOne({ id: data.userId });

    // TODO: check is the user exists
    if (!user) {
      return next();
    }

    const tokens = getTokens(user);

    res.cookie('refresh-token', tokens.refreshToken);
    res.cookie('access-token', tokens.accessToken);

    // @ts-ignore
    req.userId = user.id;

    next();
  });

  const server = new ApolloServer({
    resolvers: globalResolvers,
    typeDefs: globalQuery,
    context: ({ req, res }): { req: Request; res: Response } => ({ req, res }),
    tracing: true,
  });

  server.applyMiddleware({ app, cors: corsOptions });
  app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
})();
