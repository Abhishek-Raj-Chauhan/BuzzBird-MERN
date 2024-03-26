import React, { useRef } from "react";
import "./Logc.css";
const Alert2 = (props) => {
  const ref = useRef(null);
  const cref = useRef(null);
  ref.current.click();
  setTimeout(() => {
    cref.current.click();
  }, props.alerti.time);
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        id="but1"
        ref={ref}
      >
        {props.alerti.msg}
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog d-flex justify-content-center align-items-center"
          style={{ height: "100%" }}
        >
          <div
            className="modal-content d-flex flex-row justify-content-center align-items-center"
            style={{ height: "22rem", width: "79%" }}
          >
            <div
              className="modal-header"
              style={{ height: "100%", width: "100%" }}
            >
              <div
                className="modalbox success col-sm-8 col-md-6 col-lg-5 center animate"
                style={{ height: "89%", width: "89%", color: "black" }}
              >
                <div
                  className="icon d-flex justify-content-center align-items-center"
                  style={{
                    height: "10rem",
                    width: "10rem",
                    marginBottom: "2rem",
                  }}
                >
                  <i
                    className="fa-solid fa-check"
                    style={{ color: "#ffffff", fontSize: "5rem" }}
                  ></i>
                </div>

                <h2>{props.alerti.smsg}</h2>
                <p>The window will close automatically</p>
              </div>
              <button
                type="button"
                className="btn-close d-none"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="but2"
                ref={cref}
              ></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert2;
