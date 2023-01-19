import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";

import UserMenu from "../../components/nav/UserMenu";

import axios from "axios";
import toast from "react-hot-toast";

const Profile = () => {
  // context
  const [auth, setAuth] = useAuth();

  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (auth?.user) {
      const { name, email, address } = auth?.user;
      setName(name);
      setEmail(email);
      setAddress(address);
    }
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/profile", { name, password, address });

      if (data?.error) {
        toast.error(data.error);
      } else {
        setAuth({ ...auth, user: data });
        // localStorage update
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">Update Profile</div>

            <form onSubmit={handleSubmit}>
              <label htmlFor="input-profile-name" className="ms-2">
                Name
              </label>
              <input
                id="input-profile-name"
                type="text"
                className="form-control m-2 p-2"
                placeholder="Enter your name.."
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus={true}
              />

              <label htmlFor="input-profile-email" className="ms-2">
                Email
              </label>
              <input
                id="input-profile-email"
                type="email"
                className="form-control m-2 p-2"
                placeholder="Enter your email.."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled
              />

              <label htmlFor="input-profile-password" className="ms-2">
                Password
              </label>
              <input
                id="input-profile-password"
                type="password"
                className="form-control m-2 p-2"
                placeholder="Enter your password.."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <label htmlFor="input-profile-address" className="ms-2">
                Address
              </label>
              <input
                id="input-profile-address"
                type="text"
                className="form-control m-2 p-2"
                placeholder="Enter your address.."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <button className="btn btn-info ms-2 mt-2">Update</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
