import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/auth";

const Menu = () => {
  const [auth, setAuth] = useAuth();
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
          <form className="d-flex" style={{ width: "60%" }}>
            <input
              type="search"
              className="form-control"
              placeholder="Search Product.."
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
