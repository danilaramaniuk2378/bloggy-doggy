import Lokka from 'lokka';
import Transport from 'lokka-transport-http';

export default () => {
  const headers = {};

  if (localStorage.token) {
    headers.authorization = localStorage.token;
  }

  const url = process.env.NODE_ENV === 'production' ? '/api/graphql/' : 'http://localhost:3000/graphql/';

  return new Lokka({
    transport: new Transport(url, { headers }),
  });
};
