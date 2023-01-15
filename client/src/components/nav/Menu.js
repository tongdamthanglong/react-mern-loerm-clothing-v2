import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useCategory from "../../hooks/useCategory";
import { useAuth } from "../../context/auth";

import Search from "../forms/Search";

const Menu = () => {
  // context
  const [auth, setAuth] = useAuth();
  // hook
  const categories = useCategory();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/");
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center ps-2 pe-4">
        <div
          className="d-flex justify-content-between align-items-center gap-3 mt-3 mb-4"
          style={{ width: "50%" }}
        >
          <NavLink
            className="text-info fw-semibold text-center"
            style={{ margin: "0px", width: "30%", textDecoration: "none" }}
            to="/"
          >
            LOERM SHOP
          </NavLink>

          <Search style={{ width: "60%" }} />
        </div>

        <div>
          <ul className="nav d-flex justify-content-center mt-3 mb-4">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/shop">
                Shop
              </NavLink>
            </li>

            <div className="dropdown">
              <li>
                <a
                  className="nav-link pointer dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  Categories
                </a>

                <ul className="dropdown-menu">
                  <li>
                    <NavLink className="nav-link" to={`/categories`}>
                      All Categories
                    </NavLink>
                  </li>

                  {categories?.map((category) => {
                    return (
                      <li key={category?._id}>
                        <NavLink
                          className="nav-link"
                          to={`/category/${category.slug}`}
                        >
                          {category?.name}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </div>

            {!auth?.user ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              <div className="dropdown">
                <li>
                  <a
                    className="nav-link pointer dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    {auth?.user?.name}
                  </a>

                  <ul className="dropdown-menu">
                    <li>
                      <NavLink
                        className="nav-link"
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                      >
                        Dashboard
                      </NavLink>
                    </li>

                    <li className="nav-item pointer">
                      <a onClick={handleLogout} className="nav-link">
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>
              </div>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Menu;
