import React from "react";
import loading from "./loading.gif";

const Spinner = () => {
  return (
    <div>
      {/* Semi-transparent overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.7)", // Adjust opacity here
          zIndex: 9998, // Place the overlay beneath the spinner
        }}
      ></div>
      {/* Spinner */}
      <div
        className="text-center"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999, // Ensure the spinner appears on top of the overlay
        }}
      >
        <img src={loading} alt="loading" style={{ width: "150px" }} />
      </div>
    </div>
  );
};

export default Spinner;
