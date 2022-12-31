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
      <ul className="nav d-flex justify-content-center mt-3 mb-4">
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/">
            Home
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
          <li className="nav-item">
            <a
              onClick={handleLogout}
              className="nav-link"
              style={{ cursor: "pointer" }}
            >
              Logout
            </a>
          </li>
        )}
      </ul>
    </>
  );
};

export default Menu;
