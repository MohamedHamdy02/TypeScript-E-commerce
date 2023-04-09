import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

type CartContextProviderProps = {
  children: React.ReactNode;
};

const Context = createContext<string | number | boolean | any>(null);

export const ProductCart = ({ children }: CartContextProviderProps) => {
  const getLocalStorage = (name: string) => {
    if (typeof window !== "undefined") {
      const storage = localStorage.getItem(name);

      if (storage !== null)
        return JSON.parse(localStorage.getItem(name) as any);

      if (name === "cartItems") return [];

      return 0;
    }
  };

  const [showCart, setShowCart] = useState<boolean>(false);

  const [cartItems, setCartItems] = useState<Array<any>>(
    getLocalStorage("cartItems")
  );

  const [totalPrice, setTotalPrice] = useState<number>(
    getLocalStorage("totalPrice")
  );

  const [totalQuantities, setTotalQuantities] = useState<number>(
    getLocalStorage("totalQuantities")
  );

  const [qty, setQty] = useState<number>(1);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    localStorage.setItem("totalPrice", JSON.stringify(totalPrice));

    localStorage.setItem("totalQuantities", JSON.stringify(totalQuantities));
  }, [cartItems, totalPrice, totalQuantities]);

  let findProduct;
  let index;

  const onAdd = (
    product: {
      slug: string;
      variants: { pricing: { price: { gross: { amount: number } } } }[];
      name: string;
      quantity: number;
    },
    quantity: number
  ) => {
    const checkProductInCart = cartItems.find(
      (cartProduct: { slug: string }) => cartProduct.slug === product.slug
    );

    if (checkProductInCart) {
      setTotalPrice(
        totalPrice +
          product?.variants?.[0]?.pricing?.price?.gross?.amount * quantity
      );
      setTotalQuantities(totalQuantities + quantity);

      const updatedCartItems = cartItems.map(
        (cartProduct: { slug: string; quantity: number }) => {
          if (cartProduct.slug === product.slug) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + quantity,
            };
          }
          return cartProduct;
        }
      );

      setCartItems(updatedCartItems);
      toast.success(`${qty} ${product.name} added to your cart`);
    } else {
      setTotalPrice(
        totalPrice +
          product?.variants?.[0]?.pricing?.price?.gross?.amount * quantity
      );
      setTotalQuantities(totalQuantities + quantity);
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);

      toast.success(`${qty} ${product.name} added to your cart`);
    }
  };

  const onRemove = (product: { slug: string }) => {
    findProduct = cartItems.find(
      (item: { slug: string }) => item.slug === product.slug
    );
    const tempCart = cartItems.filter(
      (item: { slug: string }) => item.slug !== product.slug
    );
    setTotalPrice(0);
    setTotalQuantities(0);
    setCartItems(tempCart);
  };

  const toggleCartItemQuantity = (id: string, value: string) => {
    findProduct = cartItems.find((item: { slug: string }) => item.slug === id);
    index = cartItems.findIndex(
      (product: { slug: string }) => product.slug === id
    );

    if (value === "inc") {
      findProduct.quantity += 1;
      cartItems[index] = findProduct;
      setTotalPrice(
        totalPrice + findProduct?.variants?.[0]?.pricing?.price?.gross?.amount
      );
      setTotalQuantities(totalQuantities + 1);
    }

    if (value === "dec") {
      if (findProduct.quantity > 1) {
        findProduct.quantity -= 1;
        cartItems[index] = findProduct;
        setTotalPrice(
          totalPrice - findProduct?.variants?.[0]?.pricing?.price?.gross?.amount
        );
        setTotalQuantities(totalQuantities - 1);
      }
    }
  };

  const incQty = () => {
    setQty((oldQty) => {
      const tempQty = oldQty + 1;
      return tempQty;
    });
  };

  const decQty = () => {
    setQty((oldQty) => {
      let tempQty = oldQty - 1;
      if (tempQty < 1) {
        tempQty = 1;
      }
      return tempQty;
    });
  };

  return (
    <Context.Provider
      value={{
        onAdd,
        onRemove,
        cartItems,
        totalPrice,
        totalQuantities,
        setShowCart,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        showCart,
        incQty,
        decQty,
        qty,
        toggleCartItemQuantity,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useProductCart = () => useContext(Context);
