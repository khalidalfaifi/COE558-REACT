import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'your-graphql-api-endpoint', // Replace with your GraphQL API endpoint.
  cache: new InMemoryCache(),
});

export default client;
