import ApolloClient from 'apollo-boost';
import fetch from 'isomorphic-fetch';
import { getJWT } from '../utils/jwt';

const client = new ApolloClient({
  uri: `https://${process.env.GATSBY_MIDTYPE_APP_ID}.midtype.dev/graphql`,
  fetch,
  request: operation => {
    operation.setContext(() => {
      // On every request to the API, retrieve the JWT from local storage.
      const jwt = getJWT();

      // If the JWT exists, include it in the `Authorization` header.
      // If not, don't include the `Authorization` header at all.
      return {
        headers: jwt ? { Authorization: `Bearer ${jwt}` } : {}
      };
    });
    return Promise.resolve();
  }
});

export default client;
