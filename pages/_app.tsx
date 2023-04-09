import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";

import { apolloClient } from "../Lib/graphql";
import Layout from "@/src/components/Layout/Layout";

import { ProductCart } from "@/Hooks/ProductCart";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProductCart>
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </ProductCart>
  );
}
