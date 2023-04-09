import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: "https://mohamed-store-7505.eu.saleor.cloud/graphql/",
  cache: new InMemoryCache(),
});
