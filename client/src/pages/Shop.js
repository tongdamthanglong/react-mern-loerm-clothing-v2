import React, { useState, useEffect } from "react";
import { Checkbox, Radio } from "antd";
import axios from "axios";

import { prices } from "../prices";
import ProductCard from "../components/cards/ProductCard";

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]); //categories
  const [radio, setRadio] = useState([]); //radio

  useEffect(() => {
    if (!checked.length || !radio.length) loadProducts();
  }, []);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (checked.length || radio.length) loadFilteredProducts();
  }, [checked, radio]);

  const loadProducts = async () => {
    try {
      const { data } = await axios.get("/products");
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadFilteredProducts = async () => {
    try {
      const { data } = await axios.post("/filtered-products", {
        checked,
        radio,
      });
      console.log("filtered products => ", data);
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChecked = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((categoryId) => categoryId !== id);
    }
    setChecked(all);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">
              Filter by Categories
            </h2>
            <div className="row p-2">
              {categories?.map((category) => {
                return (
                  <Checkbox
                    className="mb-2"
                    key={category._id}
                    onChange={(e) =>
                      handleChecked(e.target.checked, category._id)
                    }
                  >
                    {category.name}
                  </Checkbox>
                );
              })}
            </div>

            <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">
              Filter by Prices
            </h2>
            <div className="row p-2">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {prices?.map((price) => {
                  return (
                    <div
                      key={price._id}
                      className="mb-2"
                      style={{ marginLeft: "8px" }}
                    >
                      <Radio value={price.array}>{price.name}</Radio>
                    </div>
                  );
                })}
              </Radio.Group>
            </div>
            <div className="p-3">
              <button
                className="btn btn-outline-info"
                style={{ width: "100%" }}
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
            </div>
          </div>
          <div className="col-md-9">
            <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">
              {products?.length} Products
            </h2>
            <div className="row mb-5">
              {products?.map((product) => {
                return (
                  <div className="col-md-4" key={product._id}>
                    <ProductCard product={product} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
