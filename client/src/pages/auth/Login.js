import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";

import Jumbotron from "../../components/cards/Jumbotron";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // res.data
      const { data } = await axios.post(`/login`, {
        email,
        password,
      });
      console.log(data);

      if (data?.error) {
        toast.error(data.error);
      } else {
        // local storage JSON setItem(key, value)
        localStorage.setItem("auth", JSON.stringify(data));
        setAuth({ ...auth, user: data.user, token: data.token });
        toast.success("Login Successful!");
        navigate(
          location.state ||
            `/dashboard/${data?.user?.role === 1 ? "admin" : "user"}`
        );
      }

      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
      toast.error("Login Failed.");
    }
  };

  return (
    <div>
      <Jumbotron title="Login" subtitle="Deal-a-holics welcomed!" />
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="login-email-input"
                className="form-label fw-semibold"
              >
                Email
              </label>
              <input
                id="login-email-input"
                type="email"
                className="form-control mb-4 p-2"
                placeholder="Enter email.."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label
                htmlFor="login-password-input"
                className="form-label fw-semibold"
              >
                Password
              </label>
              <input
                id="login-password-input"
                type="password"
                className="form-control mb-4 p-2"
                placeholder="Enter password.."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="btn btn-info text-light" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
