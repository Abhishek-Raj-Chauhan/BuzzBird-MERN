import React, { useState } from "react";
import userContext from "./userContext";
const UserState = (props) => {
  const host = "https://cozynotes-mern.onrender.com";
  // console.log(noteContext)
  const UserIni = [];
  const [userdata, setuserdata] = useState(UserIni);
  const fetchUserData = async () => {
    // API CALL
    const response = await fetch(`${host}/api/auth/getUser`, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setuserdata(json);
  };

  return (
    <userContext.Provider value={{ userdata, fetchUserData }}>
      {props.children}
    </userContext.Provider>
  );
};

export default UserState;
