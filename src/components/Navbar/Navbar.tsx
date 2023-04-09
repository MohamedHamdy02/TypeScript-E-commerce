import { useProductCart } from "@/Hooks/ProductCart";
import Link from "next/link";
import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Cart from "../Cart/Cart";

type Props = {};

const Navbar = (props: Props) => {
  const { totalQuantities, showCart, setShowCart } = useProductCart();
  return (
    <div className="nav-container">
      <div className="nav-title">
        <Link href="/">
          <h3>Ghazy Store</h3>
        </Link>
      </div>
      <div className="nav-cart">
        {showCart ? (
          <Cart />
        ) : (
          <button
            onClick={() => {
              setShowCart(true);
            }}
          >
            <AiOutlineShoppingCart />
            <span suppressHydrationWarning className="cart-qty">
              {totalQuantities}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
