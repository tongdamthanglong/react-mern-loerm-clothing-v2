import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Loading = () => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currCount) => --currCount);
    }, 1000);
    // count === 0 then redirect to login page
    count === 0 && navigate("/login");
    // cleanup
    return () => clearInterval(interval);
  }, [count]);
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      Redirect to login in {count}s
    </div>
  );
};

export default Loading;
