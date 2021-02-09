import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from './schema';
import resolvers from './resolvers';
import config from '../config';
import models from '../models';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const graphqlFunc = graphqlExpress(req => ({
  schema,
  context: {
    models,
    JWT_SECRET: config.JWT_SECRET,
    host: req.headers.host,
  },
}));

const graphqilFunc = graphiqlExpress({
  endpointURL: '/graphql',
});

export {
  graphqilFunc,
  graphqlFunc,
};
