import { IncomingMessage, ServerResponse } from 'http';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { tokenManager } from 'src/utils';
import { TypedTypePolicies } from 'src/graphql/helpers';

export type ResolverContext = {
  req?: IncomingMessage;
  res?: ServerResponse;
};

function createLink() {
  const authLink = setContext((_, { headers }) => {
    const token = tokenManager.get();

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  });

  return authLink.concat(httpLink);
}

export function createApolloClient() {
  const typePolicies: TypedTypePolicies = {
    User: { keyFields: ['id'] },
  };

  return new ApolloClient({
    ssrMode: false,
    link: createLink(),
    cache: new InMemoryCache({ typePolicies }),
  });
}
