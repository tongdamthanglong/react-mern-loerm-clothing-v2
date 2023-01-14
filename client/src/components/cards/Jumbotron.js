import React from "react";

const Jumbotron = ({ title, subtitle }) => {
  return (
    <div className="container-fluid jumbotron" style={{ height: "300px" }}>
      <div className="row">
        <div className="col text-center p-5 mt-2">
          <h1 className="mb-2 mt-5 text-light">{title}</h1>
          <p className="lead mt-3 text-light">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;
