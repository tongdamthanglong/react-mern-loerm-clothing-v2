import { useState, useEffect } from "react";
import axios from "axios";

const useCategory = () => {
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

  return categories;
};

export default useCategory;
