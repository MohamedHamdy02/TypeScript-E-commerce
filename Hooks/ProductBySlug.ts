import { gql } from "@apollo/client";

export const Q_getProductSlug = gql`
  query GetProductByslug($slug: String!) {
    product(slug: $slug, channel: "default-channel") {
      slug
      name
      description
      category {
        slug
        name
      }
      media {
        url
      }
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
    }
  }
`;
