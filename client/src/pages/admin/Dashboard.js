import React from "react";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth, setAuth] = useAuth();
  return (
    <>
      <div>Admin Dashboard</div>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </>
  );
};

export default Dashboard;
