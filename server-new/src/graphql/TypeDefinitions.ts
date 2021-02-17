import { gql } from 'apollo-server-express';
import flatTypes from './flat/FlatTypes';
import userTypes from './user/UserTypes';

import { DocumentNode } from 'graphql';

const queryTypes: DocumentNode = gql`
  type Query {
    getFlats: [Flat]
  }
  type Mutation {
    addFlat(price: Int!, phone: String): Flat
    signUp(email: String, password: String): Boolean
  }
`;

const globalQuery: DocumentNode[] = [flatTypes, userTypes, queryTypes];

export default globalQuery;
