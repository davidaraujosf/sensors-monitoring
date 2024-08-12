import { ApolloClient, InMemoryCache } from '@apollo/client';

import { enviroment } from './enviroment';

const client = new ApolloClient({
  uri: enviroment.GRAPHQL_URL,
  cache: new InMemoryCache(),
});

export default client;
