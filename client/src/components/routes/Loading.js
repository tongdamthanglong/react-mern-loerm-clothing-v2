import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Loading = () => {
  const [count, setCount] = useState(2);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currCount) => --currCount);
    }, 1000);
    // count === 0 then redirect to login page
    // location.pathname ví dụ như là cái /dashboard/intended
    count === 0 &&
      navigate("/login", {
        state: location.pathname,
      });
    // cleanup
    return () => clearInterval(interval);
  }, [count]);
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
