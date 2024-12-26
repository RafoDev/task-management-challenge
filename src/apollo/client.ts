import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const baseUrl = import.meta.env.VITE_GQL_API;
const token = import.meta.env.VITE_GQL_API_TOKEN;

const httpLink = createHttpLink({
  uri: baseUrl,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
