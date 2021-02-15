import flatResolvers from './flat/FlatResolvers';

const globalResolvers = {
  Query: {
    getFlats: flatResolvers.getFlats,
  },
  Mutation: {
    addFlat: flatResolvers.addFlat,
  },
};

export default globalResolvers;
