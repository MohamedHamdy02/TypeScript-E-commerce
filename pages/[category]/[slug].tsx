import React from "react";
import { Q_getProductSlug } from "../../Hooks/ProductBySlug";
import { Q_categoryProduct } from "../../Hooks/ProductByCategeory";
import { apolloClient } from "@/Lib/graphql";
import { GetStaticProps } from "next";

import { ProductCountableEdge } from "@/src/gql/graphql";

import ProductDetails from "@/src/components/ProductDetails/ProductDetails";
import ProductCategory from "@/src/components/ProductCategory/ProductCategory";

const Details = ({ relatedProduct, relatedCategory }: any) => {
  const productID = relatedProduct?.data?.product || [];

  const categoryID =
    relatedCategory?.data?.category.parent.products.edges || [];

  return (
    <>
      <ProductDetails productID={productID} relatedProduct={relatedProduct} />

      <div className="similar-products-container">
        <h1>Similar Products</h1>
        <div className="similar-products-row">
          {categoryID
            .filter(
              (item: ProductCountableEdge) => item.node.slug !== productID.slug
            )
            .map(
              ({
                node: { name, thumbnail, variants, slug, category },
              }: string | any) => (
                <ProductCategory
                  key={slug}
                  name={name}
                  thumbnail={thumbnail}
                  variants={variants}
                  category={category}
                  slug={slug}
                />
              )
            )}
        </div>
      </div>
    </>
  );
};

export default Details;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const productID = apolloClient.query({
    query: Q_getProductSlug,
    variables: {
      slug: params?.slug || null,
    },
  });

  const productCategeory = apolloClient.query({
    query: Q_categoryProduct,
    variables: {
      slug: params?.category || null,
    },
  });

  const [productIDRes, productCategeoryRes] = await Promise.all([
    productID,
    productCategeory,
  ]);

  return {
    props: {
      relatedProduct: productIDRes || null,
      relatedCategory: productCategeoryRes || null,
    },
    revalidate: 1,
  };
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}
