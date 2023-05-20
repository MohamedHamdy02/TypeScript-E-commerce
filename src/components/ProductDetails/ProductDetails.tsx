import { useProductCart } from "@/Hooks/ProductCart";
import { Product, ProductCountableConnection } from "@/src/gql/graphql";
import React, { useState } from "react";
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import Rating from "../Rating/Rating";
import Image from "next/image";

type Props = {
  productID: Product;
  relatedProduct: ProductCountableConnection;
};

const ProductDetails = ({ relatedProduct, productID }: Props) => {
  productID = relatedProduct?.data?.product || [];

  const [index, setIndex] = useState<number>(0);

  const { incQty, decQty, qty, onAdd, setShowCart } = useProductCart();
  return (
    <div className="details-container">
      <div className="details-row">
        <div>
          <div className="image-container">
            <Image
              src={productID?.media?.[index]?.url}
              alt={productID.slug}
              width={400}
              height={370}
              priority
            />
          </div>
          <div className="small-images-container">
            {productID?.media?.map((item, i) => (
              <Image
                src={item?.url}
                alt={productID.name}
                width={80}
                height={80}
                priority
                key={i}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
        <div className="desc-container">
          <h1>{productID.name}</h1>
          <div className="reviews">
            <Rating />
          </div>
          <div className="details">
            <h4>Details :</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque,
              explicabo!
            </p>
          </div>
          <div className="price">
            <h4>Price :</h4>

            <h2>${productID?.variants?.[0]?.pricing?.price?.gross?.amount}</h2>
          </div>
          <div className="quantity">
            <h3>Quantity :</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAdd(productID, qty)}
            >
              Add to Cart
            </button>
            <button
              type="button"
              className="buy-now"
              onClick={() => setShowCart(true, onAdd(productID, qty))}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
