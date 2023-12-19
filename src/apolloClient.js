import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
  //uri: 'https://us-central1-final-project-1-408101.cloudfunctions.net/processingdata/graphql', // Replace with your GraphQL server URL
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
