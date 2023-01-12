import React, { useState, useEffect } from "react";
import axios from "axios";

import ProductCard from "../components/cards/ProductCard";
import Jumbotron from "../components/cards/Jumbotron";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
    getTotal();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/products-count");
      setTotal(data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadProducts = async () => {
    try {
      const { data } = await axios.get(`/list-products/${page}`);
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/list-products/${page}`);
      setProducts([...products, ...data]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
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
      <div className="container text-center p-5 pt-3">
        {products && products.length < total && (
          <button
            className="btn btn-outline-info"
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              setPage(page + 1);
            }}
          >
            {loading ? "Loading.." : "Load more"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
