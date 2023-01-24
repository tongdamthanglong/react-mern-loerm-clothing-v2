import React from "react";
import { useCart } from "../context/cart";

import Jumbotron from "../components/cards/Jumbotron";
import UserCartSidebar from "../components/cards/UserCartSidebar";
import ProductCardHorizontal from "../components/cards/ProductCardHorizontal";

const Cart = () => {
  const [cart, setCart] = useCart();

  return (
    <>
      <Jumbotron
        title={`Shopping Cart`}
        subtitle={
          cart?.length > 1
            ? `You have ${cart?.length} items in cart.`
            : "Empty Cart."
        }
      />
      {cart?.length >= 1 && (
        <div className="container">
          <div className="row mt-4 ps-5 pe-5">
            <div className="col-md-8">
              <div className="row mb-4">
                {cart.map((productCart, index) => (
                  <ProductCardHorizontal
                    key={index}
                    productCart={productCart}
                  />
                ))}
              </div>
            </div>
            <UserCartSidebar />
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
