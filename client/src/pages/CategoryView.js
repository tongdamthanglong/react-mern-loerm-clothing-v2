import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "../components/cards/ProductCard";
import axios from "axios";

const CategoryView = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params?.slug) loadProductByCategory();
  }, [params?.slug]);

  const loadProductByCategory = async () => {
    try {
      const { data } = await axios.get(`/products-by-category/${params?.slug}`);
      setCategory(data.category);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <p className="h2 text-center fw-semibold mt-5 mb-5">{category?.name}</p>
      <div className="container-fluid">
        <div className="row ms-4 me-4 mb-5">
          {products?.map((product) => {
            return (
              <div key={product._id} className="col-md-4">
                <ProductCard product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryView;
