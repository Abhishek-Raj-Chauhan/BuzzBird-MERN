import React, { useState } from "react";
import AlertContext from "./AlertContext";
const AlertState = (props) => {
  const [alerter, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      typo: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };
  const Operation = (x) => {
    if (x === "delete") {
      showAlert("deleted", "success");
    } else if (x === "edit") {
      showAlert("Edited", "success");
    } else if (x === "add") {
      showAlert("Note Added Successfully", "success");
    } else if (x === "loginS") {
      showAlert("Note Added Successfully", "success");
    } else if (x === "loginD") {
      showAlert("Note Added Successfully", "deny");
    } else if (x === "logout") {
      showAlert("You have been Logged out", "danger");
    }
  };
  return (
    <AlertContext.Provider value={{ Operation, alerter }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
