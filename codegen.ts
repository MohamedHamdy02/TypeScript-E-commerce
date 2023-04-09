import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: [
    {
      "https://mohamed-store-7505.eu.saleor.cloud/graphql/": {},
    },
  ],
  ignoreNoDocuments: true,
  generates: {
    "./src/gql/": {
      documents: ["src/**/*.tsx"],
      preset: "client",
      plugins: [],
    },
  },
  config: {
    typesPrefix: "IGen",
  },
};

export default config;
