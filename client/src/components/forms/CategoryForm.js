import React from "react";

const CategoryForm = ({ value, setValue, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control p-3"
        placeholder="Category Name.."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="btn btn-info mt-3">
        Submit
      </button>
    </form>
  );
};

export default CategoryForm;
