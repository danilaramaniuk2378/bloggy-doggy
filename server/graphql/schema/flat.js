const typeShard = `
    type Address {
        latitude: String!,
        longitude: String!,
    }

    type Flat {
        _id: String!,
        ownerId: String!,
        phone: String!,
        photoUrls: [String!]!,
        price: Int!,
        address: Address!,
    }
`;

const queryShard = `
    allFlats: [Flat!]!,
    getFlat(_id: String!): Flat!,
`;

export {
  typeShard,
  queryShard,
};
