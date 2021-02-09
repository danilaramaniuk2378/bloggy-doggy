import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import config from './config';
import { graphqilFunc, graphqlFunc } from './graphql/index';
import {
  usersRoute,
  flatsRoute,
} from './routes';
import './passport';
import cors from 'cors';

mongoose.connect(config.MONGO_URI);

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(cors({ credentials: true, origin: 'http://localhost:8080' }));
}

// Middlewares
app.use(bodyParser.json());

// Routes
app.use('/users', usersRoute);
app.use('/flats', flatsRoute);

// GRAPHQL
app.use(
  '/graphiql',
  graphqilFunc,
);
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlFunc,
);

app.listen(config.PORT, () => console.log(`Server is running on ${config.PORT}`));
