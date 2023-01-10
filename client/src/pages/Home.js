import React, { useState, useEffect } from "react";
import axios from "axios";

import ProductCard from "../components/cards/ProductCard";
import Jumbotron from "../components/cards/Jumbotron";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { data } = await axios.get("/products");
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const arr = [...products];
  const sortedBySold = arr?.sort((a, b) => (a.sold < b.sold ? 1 : -1));

  return (
    <div>
      <Jumbotron
        title={"Hello Friends!"}
        subtitle={"Welcome to Free Code Resourses"}
      />
      <div className="row pe-5 ps-5 pt-3 pb-3">
        <div className="col-md-6">
          <h2 className="p-3 mt-2 mb-3 h4 bg-light text-center">
            New Arrivals
          </h2>
          <div className="row">
            {products?.map((product) => {
              return (
                <div className="col-md-6" key={product._id}>
                  <ProductCard product={product} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-md-6">
          <h2 className="p-3 mt-2 mb-3 h4 bg-light text-center">
            Best Sellers
          </h2>
          <div className="row">
            {sortedBySold?.map((product) => {
              return (
                <div className="col-md-6" key={product._id}>
                  <ProductCard product={product} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
