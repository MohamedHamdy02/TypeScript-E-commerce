import React, { MutableRefObject, useEffect, useRef } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { useProductCart } from "@/Hooks/ProductCart";
import { ProductVariant, TaxedMoney } from "@/src/gql/graphql";
import Image from "next/image";

const Cart = () => {
  const cartRef = useRef() as MutableRefObject<HTMLDivElement>;

  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuantity,
    onRemove,
  } = useProductCart();

  useEffect(() => {
    const closeModalHandler = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!cartRef.current.contains(target)) {
        setShowCart(false);
      }
    };
    document.addEventListener("mousedown", closeModalHandler);

    return () => {
      document.removeEventListener("mousedown", closeModalHandler);
    };
  }, [setShowCart]);

  return (
    <div className="cart-wrapper">
      <div className="cart-container" ref={cartRef}>
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <div>
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}

        <div className="product-container">
          {cartItems.length > 0 &&
            cartItems.map(
              (item: {
                variants: Array<ProductVariant>;
                thumbnail: {
                  url: string;
                };
                url: string;
                slug: string;
                name: string;
                price: TaxedMoney;
                quantity: number;
              }) => (
                <div className="product" key={item?.slug}>
                  <Image
                    src={item?.thumbnail?.url}
                    alt={item.name}
                    width={150}
                    height={150}
                    className="cart-product-image"
                    priority
                  />
                  <div className="item-desc">
                    <div className="flex top">
                      <h5>{item?.name}</h5>
                      <h4>
                        $
                        {item?.variants?.[0]?.pricing?.price?.gross?.amount.toFixed(
                          0
                        )}
                      </h4>
                    </div>
                    <div className="flex bottom">
                      <div>
                        <p className="quantity-desc">
                          <span
                            className="minus"
                            onClick={() =>
                              toggleCartItemQuantity(item.slug, "dec")
                            }
                          >
                            <AiOutlineMinus />
                          </span>
                          <span className="num">{item?.quantity}</span>
                          <span
                            className="plus"
                            onClick={() =>
                              toggleCartItemQuantity(item.slug, "inc")
                            }
                          >
                            <AiOutlinePlus />
                          </span>
                        </p>
                      </div>
                      <button
                        type="button"
                        className="remove-item"
                        onClick={() => onRemove(item)}
                      >
                        <TiDeleteOutline />
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice.toFixed(0)}</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
