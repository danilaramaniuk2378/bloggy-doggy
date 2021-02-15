import { gql } from 'apollo-server';
import flatTypes from './flat/FlatTypes';

import { DocumentNode } from 'graphql';

const queryTypes: DocumentNode = gql`
  type Query {
    getFlats: [Flat]
  }

  type Mutation {
    addFlat(price: Int!, phone: String): Flat
  }
`;

const globalQuery: DocumentNode[] = [flatTypes, queryTypes];

export default globalQuery;
