import React from "react";
import { useCart } from "../context/cart";

const Cart = () => {
  const [cart, setCart] = useCart();

  return (
    <div>
      {cart.length}
      <pre>{JSON.stringify(cart, null, 4)}</pre>
    </div>
  );
};

export default Cart;
