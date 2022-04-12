import React from "react";
import "./Alert.css";
const Alert = ({ message, type }) => {
  return (
    <div className="alert-div position-fixed">
      <div className={`alert alert-${type}`} role="alert">
        <strong>{message}</strong>
      </div>
    </div>
  );
};

export default Alert;
