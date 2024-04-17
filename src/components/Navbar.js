import React, { useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import "../App.css";

const Navbar = (props) => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const history = useHistory();
  let location = useLocation();

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const handleLinkClick = () => {
    // Always collapse the navbar on any link click
    handleNavCollapse();
  };
  const handlelogOut = (e) => {
    handleLinkClick();
    e.preventDefault();
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      localStorage.setItem("state", "logout");
      history.push("/");
    }
  };


  return (
    <>
      <div
        className="con fixed-top d-flex justify-content-center align-items-center flex-column"
        style={{ marginBottom: "2rem", height: "max-content", width: "100vw" }}
      >
        <nav
          id="navBar"
          className="navbar navbar-expand-lg"
          style={{
            width: "100%",
            background: `${
              window.innerWidth < 991
                ? "linear-gradient(to right, #833ab4 , #2720a1,#121120 )"
                : "transparent"
            }`,
          }}
        >
          <div className="container-fluid">
            <Link
              className="navbar-brand"
              to="/home"
              style={{ color: "#ffff", fontWeight: "500" }}
            >
              CozyNotes
            </Link>
            {window.innerWidth <= 600 ? (
              <Link
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  width: "33%",
                }}
                to="/addnote"
              >
                <i
                  id="mobileedit"
                  className="fa-solid fa-file-pen"
                  style={{ color: "#ffffff" }}
                ></i>
              </Link>
            ) : (
              ""
            )}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded={!isNavCollapsed ? true : false}
              aria-label="Toggle navigation"
              onClick={handleNavCollapse}
            >
              <span
                style={{ backgroundColor: "#ffe7eb", borderRadius: "2px" }}
                className="navbar-toggler-icon"
              ></span>
            </button>
            <div
              className={`collapse navbar-collapse ${
                window.innerWidth < 991
                  ? ""
                  : "d-flex flex-row justify-content-between align-items-center"
              } ${isNavCollapsed ? "collapse" : ""}`}
              id="navbarSupportedContent"
            >
              <ul
                className={`navbar-nav ${
                  window.innerWidth < 991
                    ? ""
                    : "d-flex flex-row justify-content-evenly align-items-center"
                }`}
                style={{
                  width: window.innerWidth < 991 ? "fit-content" : "86%",
                }}
              >
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/home" ? "active" : ""
                    }`}
                    aria-current="page"
                    to="/home"
                    style={{ color: "white" }}
                    onClick={handleLinkClick}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/notes" ? "active" : ""
                    }`}
                    to="/mynotes"
                    style={{ color: "white" }}
                    onClick={handleLinkClick}
                  >
                    My Notes
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/profile" ? "active" : ""
                    }`}
                    to="/profile"
                    style={{ color: "white" }}
                    onClick={handleLinkClick}
                  >
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/chats" ? "active" : ""
                    }`}
                    to="/chats"
                    style={{ color: "white" }}
                    onClick={handleLinkClick}
                  >
                    Community Chats
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/about" ? "active" : ""
                    }`}
                    to="/about"
                    style={{ color: "white" }}
                    onClick={handleLinkClick}
                  >
                    About
                  </Link>
                </li>
              </ul>
              <div className="logers d-flex flex-row justify-content-end align-items-center">
                {!localStorage.getItem("token") ? (
                  <form className="d-flex">
                    <Link
                      className="btn mx-1"
                      to="/"
                      role="button"
                      id="login"
                      style={{
                        color: "black",
                        borderRadius: "0px",
                        backgroundColor: "white",
                      }}
                      onClick={handleLinkClick}
                    >
                      Login
                    </Link>
                    <Link
                      className="btn mx-3"
                      to="/signup"
                      role="button"
                      id="signup"
                      style={{
                        color: "black",
                        borderRadius: "0px",
                        backgroundColor: "white",
                      }}
                      onClick={handleLinkClick}
                    >
                      SignUp
                    </Link>
                  </form>
                ) : (
                  <button
                    id="logout"
                    className="btn btn-danger"
                    style={{ color: "white", marginRight: "2rem" }}
                    onClick={handlelogOut}
                  >
                    Log Out
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
