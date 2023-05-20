import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: "https://mohamed-ghazy.eu.saleor.cloud/graphql/",
  cache: new InMemoryCache(),
});
