import {
  queryShard as recoveryPasswordQuery,
  mutatuion as recoveryPasswordMutatuion,
  typeShard as recoveryPasswordType,
} from './recoveryPassword';
import {
  typeShard as flatType,
  queryShard as flatQuery,
} from './flat';
import {
  typeShard as userType,
} from './user';
import {
  typeShard as awsype,
  mutatuion as awsMutatuion,
} from './aws';

export default `
    ${flatType}
    ${userType}
    ${awsype}
    ${recoveryPasswordType}

    type Query {
        ${flatQuery}
        ${recoveryPasswordQuery}
    }

    type Mutation {
        ${recoveryPasswordMutatuion}
        ${awsMutatuion}
    }
`;
