import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { createHttpLink } from 'apollo-link-http';
import { toIdValue } from 'apollo-utilities';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const endpoint = process.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:3001/graphql';

const httpLink = createHttpLink({
  uri: endpoint,
  credentials: 'same-origin',
});

const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      song: (_, { id }) => toIdValue(cache.config.dataIdFromObject({ __typename: 'Song', id })),
    },
  },
});

export const apollo = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache,
});
