import { Category, ProductVariant } from "@/src/gql/graphql";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  name: string;
  thumbnail: {
    url: string;
  };
  variants: Array<ProductVariant>;
  slug: string;
  category: Category;
};

const ProductCategory = ({
  name,
  thumbnail,
  variants,
  slug,
  category,
}: Props) => {
  return (
    <div key={slug} className="similar-item-card">
      <div className="card-image">
        <Link
          href={{
            pathname: `/[category]/[slug]`,
            query: { slug, category: category?.slug },
          }}
        >
          <Image
            src={thumbnail.url}
            alt={name}
            width={256}
            height={256}
            priority
          />
        </Link>
      </div>

      <h4>{name}</h4>
      <h3>${variants?.[0]?.pricing?.price?.gross?.amount.toFixed(0)}</h3>
    </div>
  );
};

export default ProductCategory;
