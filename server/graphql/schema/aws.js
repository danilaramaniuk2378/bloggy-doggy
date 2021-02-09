const mutatuion = `
    signS3(filename: String!, filetype: String!): S3Payload!
`;

const typeShard = `
   type S3Payload {
     signedRequest: String!,
     url: String!,
   }
`;

export {
  mutatuion,
  typeShard,
};
