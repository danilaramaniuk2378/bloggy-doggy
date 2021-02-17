import flatResolvers from './flat/FlatResolvers';
import userResolvers from './user/UserResolvers';

const globalResolvers = {
  Query: {
    getFlats: flatResolvers.getFlats,
  },
  Mutation: {
    addFlat: flatResolvers.addFlat,
    signUp: userResolvers.signUp,
  },
};

export default globalResolvers;
