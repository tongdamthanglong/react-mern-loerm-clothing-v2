import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";

import Jumbotron from "../../components/cards/Jumbotron";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // res.data
      const { data } = await axios.post(`/register`, {
        name,
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
        toast.success("Registration Successful!");
        navigate("/dashboard");
      }

      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
      toast.error("Registration Failed.");
    }
  };

  return (
    <div>
      <Jumbotron title="Register" subtitle="Deal-a-holics welcomed!" />

      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="register-name-input"
                className="form-label fw-semibold"
              >
                Name
              </label>
              <input
                id="register-name-input"
                type="text"
                className="form-control mb-4 p-2"
                placeholder="Enter name.."
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
              <label
                htmlFor="register-email-input"
                className="form-label fw-semibold"
              >
                Email
              </label>
              <input
                id="register-email-input"
                type="email"
                className="form-control mb-4 p-2"
                placeholder="Enter email.."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label
                htmlFor="register-password-input"
                className="form-label fw-semibold"
              >
                Password
              </label>
              <input
                id="register-password-input"
                type="password"
                className="form-control mb-4 p-2"
                placeholder="Enter password.."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="btn btn-info text-light" type="submit">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
