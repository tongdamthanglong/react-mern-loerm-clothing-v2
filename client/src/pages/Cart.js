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
    localStorage.setItem("cart", JSON.stringify(myCart));
  };

  const cartTotal = () => {
    let total = 0;
    cart?.map((item) => (total += item.price));
    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
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
            <div className="col-md-4">
              <h4>Your Cart Summary</h4>
              Total/ Address/ Payment
              <hr />
              <h6>Total: {cartTotal()}</h6>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <hr />
                    <p className="fw-semibold">
                      Address: {auth?.user?.address}
                    </p>
                  </div>
                  <button
                    className="btn btn-outline-info"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-info mt-2"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Add Delivery Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-danger mt-2"
                      onClick={() => navigate("/login", { state: "/cart" })}
                    >
                      Login to Checkout
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
