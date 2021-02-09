const mutatuion = `
  sendForgotEmail(email: String!): String!,
  resetPassword(recoveryToken: String!, password: String!): resetPasswordPayload!
`;

const queryShard = `
  isUserForRecoveryExist(recoveryToken: String!): Boolean!,
`;

const typeShard = `
  type resetPasswordPayload {
    token: String!,
    refreshToken: String!,
  }
`;

export {
  mutatuion,
  queryShard,
  typeShard,
};
