import React from "react";

function Alert(props) {
  const Capitalize = (word) => {
    let x = word.toLowerCase();
    return x.charAt(0).toUpperCase() + x.slice(1);
  };
  let styler = {
    transition: "all 0.5s ease-in-out",
    marginTop: "3.8rem",
    position: "fixed",
    width: "0%",
    opacity: "0",
  };
  let x = "success";
  if (props.alerter !== null) {
    styler = {
      transition: "all 0.5s ease-in-out",
      marginTop: "3.8rem",
      position: "fixed",
      width: "75%",
      opacity: "100%",
      zIndex: "5",
    };
    if (props.alerter.typo === "danger") {
      x = "Alert";
    }
  }
  return (
    <div className="alerter" style={styler}>
      {props.alerter && (
        <div
          className={`alert rounded-0 alert-${props.alerter.typo} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{Capitalize(x)}</strong> : {props.alerter.msg}
        </div>
      )}
    </div>
  );
}
export default Alert;
