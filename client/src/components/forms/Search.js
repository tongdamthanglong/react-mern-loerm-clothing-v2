import React from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/search";
import axios from "axios";

const Search = ({ style }) => {
  // hook
  const [values, setValues] = useSearch();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`/products/search/${values?.keyword}`);
      setValues({ ...values, results: data });
      console.log(data);
      navigate("/search");
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
        onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        value={values.keyword}
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
