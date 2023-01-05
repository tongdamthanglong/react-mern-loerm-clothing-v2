import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import AdminMenu from "../../components/nav/AdminMenu";
import CategoryForm from "../../components/forms/CategoryForm";

const AdminCategory = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/category", { name });
      if (data?.error) {
        toast.error(data.error);
      } else {
        // goi func loadCategories() de khi create xong thi list ra luon category, kh can refresh mount
        loadCategories();
        toast.success(`${data.name} created!`);
      }
      setName("");
    } catch (error) {
      console.log(error);
      toast.error("Create Category Failed..");
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">Manage Categories</div>
            <div className="p-3">
              <CategoryForm
                value={name}
                setValue={setName}
                handleSubmit={handleSubmit}
              />
              <hr />
              <div className="col">
                {categories?.map((category) => (
                  <button
                    key={category._id}
                    className="btn btn-outline-info mt-3 me-3"
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCategory;
