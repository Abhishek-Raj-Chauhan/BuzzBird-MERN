import React from "react";
import {  useContext, useEffect } from "react";
import userContext from "../context/user/userContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const UserProfile = () => {
  if (document.getElementById("navBar"))
    document.getElementById("navBar").style.background = `${
      window.innerWidth < 991
        ? "linear-gradient(to right, #833ab4 , #2720a1,#121120 )"
        : "transparent"
    }`;
  let history = useHistory();
  const context = useContext(userContext);
  const { userdata, fetchUserData } = context;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchUserData();
    } else {
      history.push("/");
    }
    // eslint-disable-next-line
  }, [localStorage]);
  const publishTime= new Date(userdata.timestamp).toLocaleString({timeZone:'Asia/Kolkata'});
  return (
    <>
      <div class="background">
        <div
          className="contain d-flex justify-content-center align-items-center"
          style={{ height: "100vh", width: "100vw" }}
        >
          <div
            className="rowi d-flex justify-content-center align-items-center"
            style={{ height: "100vh", width: "100vw" }}
          >
            <div className="col d-flex justify-content-center align-items-center">
              <div
                className="cnt d-flex justify-content-center align-items-center flex-column"
                id="userpro1"
              >
                <div
                  className="card-block text-center text-white"
                  id="userpro2"
                >
                  <div className="m-b-25">
                    <img
                      src="https://t4.ftcdn.net/jpg/04/83/90/95/360_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg"
                      className="img-radius"
                      alt=""
                      id="userprofileimg"
                    />
                  </div>
                  <h2 className="f-w-600">{userdata.name}</h2>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-award-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="m8 0 1.669.864 1.858.282.842 1.68 1.337 1.32L13.4 6l.306 1.854-1.337 1.32-.842 1.68-1.858.282L8 12l-1.669-.864-1.858-.282-.842-1.68-1.337-1.32L2.6 6l-.306-1.854 1.337-1.32.842-1.68L6.331.864z" />
                    <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1z" />
                  </svg>
                </div>
                <div
                  className="card-block text-center text-white"
                  style={{ width: "100%" }}
                >
                  <h4
                    className="m-b-20 p-b-5 b-b-default f-w-600"
                    id="userpro3"
                  >
                    Information
                  </h4>
                  <div className="row">
                    <div className="col-sm-6">
                      <p
                        className="m-b-10 f-w-600 text-white"
                        style={{ fontSize: "1.2rem" }}
                      >
                        Email
                      </p>
                      <h5 className="text-white f-w-400">{userdata.email}</h5>
                    </div>
                    <div className="col-sm-6">
                      <p
                        className="m-b-10 f-w-600 text-white"
                        style={{ fontSize: "1.2rem" }}
                      >
                        Account Created On
                      </p>
                      <h5 className="text-white f-w-400">{publishTime}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </>
  );
};

export default UserProfile;
