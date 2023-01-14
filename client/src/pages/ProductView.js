import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Badge } from "antd";

const ProductView = () => {
  const [product, setProduct] = useState({});
  const params = useParams();

  useEffect(() => {
    if (params?.slug) loadProduct();
  }, [params?.slug]);

  const loadProduct = async () => {
    try {
      const { data } = await axios.get(`/product/${params.slug}`);
      console.log(data);
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid mt-4 ">
      <div className="row d-flex flex-row justify-content-center ms-5 me-5">
        <div className="col-md-6">
          <div className="card mb-3">
            <img
              className="card-img-top"
              src={`${process.env.REACT_APP_API}/product/photo/${product._id}`}
              alt={product?.name}
              style={{
                height: "350px",
                objectFit: "cover",
                borderRadius: "5px",
              }}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="card-body mb-4">
            <p className="h1 fw-normal">{product?.name}</p>
            <p className="card-text h5 fw-light mt-3">{product?.description}</p>
          </div>

          <ul className="list-group">
            <li className="list-group-item">
              <p className="m-0 h5 fw-normal">
                Quantity: {product?.quantity > 0 ? "In Stock" : "Out of Stock"}
              </p>
            </li>

            <li className="list-group-item">
              <p className="m-0 h5 fw-normal">
                Category: {product?.category?.name}
              </p>
            </li>

            <li className="list-group-item">
              <p className="m-0 h5 fw-normal">
                Price:{" "}
                {product?.price?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </p>
            </li>

            <li className="list-group-item" style={{ width: "100%" }}>
              <button
                className="btn btn-outline-info col card-button"
                style={{ borderRadius: "0px", width: "50%" }}
              >
                Add to Cart
              </button>
              <button
                className="btn btn-info col card-button"
                style={{ borderRadius: "0px", width: "50%" }}
              >
                Checkout
              </button>
            </li>
          </ul>
        </div>
        <div className="col-md-12 mt-5">
          <h3>Related Products</h3>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
