import React from "react";

const Jumbotron = ({ title, subtitle }) => {
  return (
    <div className="container-fluid bg-info">
      <div className="row">
        <div className="col text-center p-5 bg-light">
          <h1 className="mb-2">{title}</h1>
          <p className="lead">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;
