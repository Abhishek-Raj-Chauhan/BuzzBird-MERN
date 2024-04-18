import React from "react";
import loading from "./loading.gif";

const Spinner = () => {
  return (
    <div
      className="text-center"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: "9999", // Ensure the spinner appears on top of everything
      }}
    >
      <img src={loading} alt="loading" style={{ width: "100px" }} />
    </div>
  );
};

export default Spinner;