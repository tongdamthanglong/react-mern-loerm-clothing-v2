import React from "react";
import { useCart } from "../../context/cart";

const ProductCardHorizontal = ({ productCart, remove = true }) => {
  const [cart, setCart] = useCart();

  const removeFromCart = (productId) => {
    let myCart = [...cart];
    let index = myCart.findIndex((item) => item._id === productId);
    myCart.splice(index, 1);
    setCart(myCart);
    localStorage.setItem("cart", JSON.stringify(myCart));
  };

  return (
    <div className="card mb-3" style={{ minWidth: "550px" }}>
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
              {remove && (
                <p
                  className="text-danger pointer"
                  onClick={() => removeFromCart(productCart._id)}
                >
                  Remove
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardHorizontal;
