import React from "react";
import { useQuery } from "@apollo/client";
import { Q_searchProduct } from "../../../Hooks/SearchProduct";
import Link from "next/link";
import { ProductCountableConnection } from "@/src/gql/graphql";

type TProducts = {
  keyword?: string;
};

const Products: React.FC<TProducts> = ({ keyword }) => {
  var { data } = useQuery<{ products: ProductCountableConnection }>(
    Q_searchProduct,
    {
      variables: {
        keyword,
      },
    }
  );

  const latestProducts = data?.products?.edges || [];

  return (
    <div className="prodcut-container">
      {latestProducts &&
        latestProducts.map(
          ({ node: { name, thumbnail, variants, id, slug, category } }) => (
            <div className="product-item-container" key={id}>
              <div className="item">
                <Link
                  href={{
                    pathname: `/[category]/[slug]`,
                    query: { slug, category: category?.slug },
                  }}
                  className="img-container"
                >
                  <img src={thumbnail?.url} alt={name} />
                </Link>

                <div className="item-content">
                  <h4>{name?.split(" ").slice(0, 3).join(" ")}</h4>

                  <div className="price-container">
                    <h3>${variants?.[0]?.pricing?.price?.gross?.amount.toFixed(0)}</h3>
                  </div>

                  <Link
                    href={{
                      pathname: `/[category]/[slug]`,
                      query: { slug, category: category?.slug },
                    }}
                    className="button"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          )
        )}
    </div>
  );
};

export default Products;
