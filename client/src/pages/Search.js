import React, { useEffect } from "react";
import { useSearch } from "../context/search";

import Jumbotron from "../components/cards/Jumbotron";
import ProductCard from "../components/cards/ProductCard";

const Search = () => {
  const [values, setValues] = useSearch();
  useEffect(() => {
    setValues({ ...values, keyword: "" });
  }, []);
  return (
    <>
      <Jumbotron
        title="Search Result"
        subtitle={
          values?.results?.length < 1
            ? "No Product Found"
            : `Found ${values?.results?.length} Product`
        }
      />
      <div className="container mt-4 mb-5">
        <div className="row">
          {values?.results?.map((product) => {
            return (
              <div key={product._id} className="col-md-4">
                <ProductCard product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Search;
