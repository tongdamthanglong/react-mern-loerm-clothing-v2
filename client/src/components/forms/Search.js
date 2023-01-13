import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = ({ style }) => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`/products/search/${keyword}`);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="d-flex" onSubmit={handleSubmit} style={style}>
      <input
        type="search"
        className="form-control"
        placeholder="Search Product.."
        onChange={(e) => setKeyword(e.target.value)}
        style={{ borderRadius: "0px", paddingRight: "80px" }}
      />
      <button
        className="btn btn-info"
        type="submit"
        style={{ marginLeft: "-72px", borderRadius: "0px" }}
      >
        Search
      </button>
    </form>
  );
};

export default Search;
