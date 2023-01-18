import React from "react";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";

import Jumbotron from "../components/cards/Jumbotron";

const Cart = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  const navigate = useNavigate();

  const removeFromCart = (productId) => {
    let myCart = [...cart];
    let index = myCart.findIndex((item) => item._id === productId);
    myCart.splice(index, 1);
    setCart(myCart);
  };

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
                  <div
                    key={index}
                    className="card mb-3"
                    style={{ maxWidth: "600px" }}
                  >
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src={`${process.env.REACT_APP_API}/product/photo/${productCart._id}`}
                          alt={productCart.name}
                          style={{
                            height: "150px",
                            width: "150px",
                            objectFit: "cover",
                            marginLeft: "-12px",
                            borderTopLeftRadius: "5px",
                            borderBottomLeftRadius: "5px",
                          }}
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{productCart?.name}</h5>
                          <p className="card-text">{`${productCart?.description.substring(
                            0,
                            50
                          )}..`}</p>
                          <div className="d-flex justify-content-between">
                            <p className="card-text">${productCart?.price}</p>
                            <p
                              className="text-danger pointer"
                              onClick={() => removeFromCart(productCart._id)}
                            >
                              Remove
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-md-4">Total/ Address/ Payment</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
