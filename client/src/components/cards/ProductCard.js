import React from "react";
import { Badge } from "antd";
import moment from "moment";

const ProductCard = ({ product }) => {
  return (
    <div className="card mb-3">
      <Badge.Ribbon text={`${product?.sold} sold`} color="cyan">
        <Badge.Ribbon
          text={product?.quantity >= 1 ? "In Stock" : "Out of stock"}
          placement="start"
          color="red"
        >
          <img
            className="card-img-top"
            src={`${process.env.REACT_APP_API}/product/photo/${product._id}`}
            alt={product?.name}
            style={{ height: "300px", objectFit: "cover" }}
          />
        </Badge.Ribbon>
      </Badge.Ribbon>

      <div className="card-body">
        <h5>{product?.name}</h5>
        <p className="card-text">{product?.description?.substring(0, 60)}...</p>
      </div>

      <div className="d-flex justify-content-between">
        <button
          className="btn btn-outline-info col card-button"
          style={{ borderBottomLeftRadius: "5px" }}
        >
          View Details
        </button>
        <button
          className="btn btn-info col card-button"
          style={{ borderBottomRightRadius: "5px" }}
        >
          Add to Cart
        </button>
      </div>

      {/* <p>{moment(product.createdAt).fromNow()}</p>
      <p>{product.sold} sold</p> */}
    </div>
  );
};

export default ProductCard;
