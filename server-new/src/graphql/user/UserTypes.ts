import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

const userType: DocumentNode = gql`
  type User {
    _id: String
    email: String
  }
`;

export default userType;
