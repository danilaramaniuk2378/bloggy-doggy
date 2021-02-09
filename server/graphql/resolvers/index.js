import { allFlats, getFlat } from './flat';
import {
  sendForgotEmail,
  isUserForRecoveryExist,
  resetPassword,
} from './recoveryPassword';
import { signS3 } from './aws';

export default {
  Query: {
    allFlats,
    getFlat,
    isUserForRecoveryExist,
  },

  Mutation: {
    sendForgotEmail,
    resetPassword,
    signS3,
  },
};
