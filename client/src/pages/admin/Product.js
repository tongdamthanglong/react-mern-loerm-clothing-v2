import React from "react";
import { useAuth } from "../../context/auth";

import AdminMenu from "../../components/nav/AdminMenu";

const AdminProduct = () => {
  const [auth, setAuth] = useAuth();
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">Create Products</div>
            <p>Create Product Form..</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProduct;
