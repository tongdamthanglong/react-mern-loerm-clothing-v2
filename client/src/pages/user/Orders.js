import React from "react";
import { useAuth } from "../../context/auth";

import UserMenu from "../../components/nav/UserMenu";

const Orders = () => {
  const [auth, setAuth] = useAuth();
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">Orders</div>
            <p>User Orders History...</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
