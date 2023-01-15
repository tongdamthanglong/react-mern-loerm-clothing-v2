import useCategory from "../hooks/useCategory";
import { NavLink } from "react-router-dom";

const CategoriesList = () => {
  const categories = useCategory();
  return (
    <>
      <div className="container overflow-hidden">
        <p className="text-center h2 fw-semibold mt-5 mb-5">All Categories</p>
        <div className="row gx-4 gy-4 mb-5">
          {categories?.map((category) => {
            return (
              <div className="col-md-4 text-center" key={category._id}>
                <button className="btn btn-info col-10 p-3">
                  <NavLink
                    to={`/category/${category.slug}`}
                    className="nav-link text-light"
                    style={{ textDecoration: "none" }}
                  >
                    {category?.name}
                  </NavLink>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CategoriesList;
