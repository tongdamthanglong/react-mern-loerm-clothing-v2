import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";

import Loading from "./Loading";

const PrivateRoute = () => {
  const [logged, setLogged] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    if (auth?.token) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, [auth?.token]);
  return logged ? <Outlet /> : <Loading />;
};

export default PrivateRoute;
