import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";

const UserCartSidebar = () => {
  // state
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  // context
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  // hooks
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.token) {
      getClientToken();
    }
  }, [auth?.token]);

  const getClientToken = async () => {
    try {
      const { data } = await axios.get("/braintree/token");
      setClientToken(data.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  const cartTotal = () => {
    let total = 0;
    cart?.map((item) => (total += item.price));
    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const handleBuy = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod();
      console.log("nonce => ", nonce);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="col-md-4">
      <h4>Your Cart Summary</h4>
      Total/ Address/ Payment
      <hr />
      <h6>Total: {cartTotal()}</h6>
      {auth?.user?.address ? (
        <>
          <div className="mb-3">
            <hr />
            <p className="fw-semibold">Address: {auth?.user?.address}</p>
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
      <div className="mt-2">
        {!clientToken || !cart?.length ? (
          ""
        ) : (
          <>
            <DropIn
              options={{
                authorization: clientToken,
                paypal: {
                  flow: "vault",
                },
              }}
              onInstance={(instance) => setInstance(instance)}
            />
            <button
              onClick={handleBuy}
              className="btn btn-info col-md-12"
              disabled={!auth?.user?.address}
            >
              Buy
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserCartSidebar;
