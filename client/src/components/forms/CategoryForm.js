import React from "react";

const CategoryForm = ({
  value,
  setValue,
  handleSubmit,
  handleDelete,
  buttonText = "Add Category",
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control p-3"
        placeholder="Category Name.."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="d-flex justify-content-between">
        <button type="submit" className="btn btn-info mt-3">
          {buttonText}
        </button>
        {handleDelete && (
          <button onClick={handleDelete} className="btn btn-danger mt-3">
            Delete
          </button>
        )}
      </div>
    </form>
  );
};

export default CategoryForm;
