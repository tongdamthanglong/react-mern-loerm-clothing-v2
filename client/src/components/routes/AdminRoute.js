import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth";

import Loading from "./Loading";

const AdminRoute = () => {
  const [logged, setLogged] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const adminCheck = async () => {
      const { data } = await axios.get("/admin-check");
      if (data.ok) {
        setLogged(true);
      } else {
        setLogged(false);
      }
    };
    if (auth?.token) adminCheck();
  }, [auth?.token]);

  return logged ? <Outlet /> : <Loading path="" />;
};

export default AdminRoute;
