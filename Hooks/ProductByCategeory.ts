import { gql } from "@apollo/client";

export const Q_categoryProduct = gql`
  query GetProductCategory($slug: String!) {
    category(slug: $slug) {
      parent {
        products(first: 30, channel: "default-channel") {
          edges {
            node {
              name
              slug
              thumbnail {
                url
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
              category {
                id
                name
                slug
              }
            }
          }
        }
      }
    }
  }
`;
