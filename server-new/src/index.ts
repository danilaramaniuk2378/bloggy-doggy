import { ApolloServer } from 'apollo-server';
import { connectDatabase } from './database';
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
  const server = new ApolloServer({ resolvers: globalResolvers, typeDefs: globalQuery, tracing: true });

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
})();
