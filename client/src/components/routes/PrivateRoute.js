import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth";

import Loading from "./Loading";

const PrivateRoute = () => {
  const [logged, setLogged] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      // .get(`${process.env.REACT_APP_API}/auth-check`,
      //   {
      //     headers: {
      //       Authorization: auth?.token,
      //     },
      // })

      const { data } = await axios.get("/auth-check");
      if (data.ok) {
        setLogged(true);
      } else {
        setLogged(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  //   useEffect(() => {
  //     if (auth?.token) {
  //       setLogged(true);
  //     } else {
  //       setLogged(false);
  //     }
  //   }, [auth?.token]);
  return logged ? <Outlet /> : <Loading />;
};

export default PrivateRoute;
