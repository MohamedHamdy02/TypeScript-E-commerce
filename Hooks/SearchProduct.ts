import { gql } from "@apollo/client";

export const Q_searchProduct = gql`
  query searchProduct($keyword: String) {
    products(
      first: 35
      channel: "default-channel"
      filter: { search: $keyword }
    ) {
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
                  currency
                }
              }
            }
          }
        }
      }
    }
  }
`;
