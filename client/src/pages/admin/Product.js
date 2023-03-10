import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

import AdminMenu from "../../components/nav/AdminMenu";

import { Select } from "antd";
const { Option } = Select;

const AdminProduct = () => {
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [shipping, setShipping] = useState("");
  const [quantity, setQuantity] = useState("");

  const navigate = useNavigate();

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
      const productData = new FormData();
      productData.append("photo", photo);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("category", category);
      productData.append("shipping", shipping);

      const { data } = await axios.post("/product", productData);

      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`${data?.name} is created.`);
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Create Product Failed. Try Again.");
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
            <div className="p-3 mt-2 mb-2 h4 bg-light">Create Products</div>
            {photo && (
              <div className="text-center">
                <img
                  src={URL.createObjectURL(photo)}
                  alt={`${photo.name}`}
                  className="img img-responsive"
                  height="200px"
                />
              </div>
            )}
            <div className="pt-2">
              <label className="btn btn-outline-info p-2 col-12 mb-3">
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>

            <label htmlFor="product-input-name" className="form-label">
              Name
            </label>
            <input
              id="product-input-name"
              type="text"
              className="form-control p-2 mb-3"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="product-input-description" className="form-label">
              Description
            </label>
            <textarea
              id="product-input-description"
              type="text"
              className="form-control p-2 mb-3"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label htmlFor="product-input-price" className="form-label">
              Price
            </label>
            <input
              id="product-input-price"
              type="number"
              className="form-control p-2 mb-3"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <label htmlFor="product-input-quantity" className="form-label">
              Quantity
            </label>
            <input
              id="product-input-quantity"
              type="number"
              min="1"
              className="form-control p-2 mb-3"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

            <label className="form-label">Category</label>
            <Select
              bordered={false}
              size="large"
              className="form-select mb-3"
              placeholder="Choose Category"
              onChange={(value) => setCategory(value)}
              style={{ padding: "0" }}
            >
              {categories?.map((category) => (
                <Option key={category._id} value={category._id}>
                  {category.name}
                </Option>
              ))}
            </Select>

            <label className="form-label">Shipping Status</label>
            <Select
              bordered={false}
              size="large"
              className="form-select mb-3"
              placeholder="Shipping Status"
              onChange={(value) => setShipping(value)}
              style={{ padding: "0" }}
            >
              <Option value="0">No</Option>
              <Option value="1">Yes</Option>
            </Select>
            <button onClick={handleSubmit} className="btn btn-info mb-5">
              Add Product
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProduct;
