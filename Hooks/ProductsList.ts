import { gql, useQuery } from "@apollo/client";

export const Q_getProducts = gql`
  query getProducts {
    products(first: 35, channel: "default-channel") {
      edges {
        node {
          id
          slug
          name
          thumbnail {
            url
          }
          category {
            id
            name
            slug
          }
          variants {
            pricing {
              price {
                gross {
                  amount
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const ProdcutsList = () => {
  const { data, error, loading } = useQuery(Q_getProducts);

  return {
    data,
    error,
    loading,
  };
};
