import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

const flatType: DocumentNode = gql`
  type Flat {
    _id: String
    ownerId: String
    price: Int
    phone: String
  }
`;

export default flatType;
