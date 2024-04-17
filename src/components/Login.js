import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./Logc.css";
const Login = () => {
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  const onchange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  const ref = useRef(null);
  const cref = useRef(null);
  const ref2 = useRef(null);
  const cref2 = useRef(null);
  const tex = useRef(null);
  const tex2 = useRef(null);
  const updateNote = (ref, cref, time) => {
    ref.current.click();
    setTimeout(() => {
      cref.current.click();
    }, time);
  };
  let history = useHistory();
  const [redirect, setredirect] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("state")) {
      if (tex.current) tex.current.textContent = "LogOut Succesful";
      if (tex2.current) tex2.current.textContent = "Have a great day..";
      updateNote(ref, cref, 1800);
      localStorage.clear();
    }
  }, []);
  useEffect(() => {
      if (tex.current) tex.current.textContent = "Welcome";
      if (tex2.current) tex2.current.textContent = "As i am using a free plan to host my website after 15 min of inactivity the server spins down and might take few seconds to again be active, after that everything will be smooth, so just wait for first time";
      updateNote(ref, cref, 1500);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`https://cozynotes-mern.onrender.com/api/auth/login`, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    if (json.success) {
      //save the auth token and redirect
      localStorage.setItem("token", json.authToken);
      if (tex.current) tex.current.textContent = "You're now Logged in";
      if (tex2.current)
        tex2.current.textContent = "The window will close automatically";
      updateNote(ref, cref, 500);
      setredirect(true);
    } else {
      setredirect(false);
      updateNote(ref2, cref2, 1200);
    }
  };

  if (redirect === true) {
    setTimeout(() => {
      history.push("/home");
    }, 600);
  }
  if (document.getElementById("navBar"))
    document.getElementById("navBar").style.background = `${
      window.innerWidth < 601
        ? "linear-gradient(to right, #833ab4 , #2720a1,#121120 )"
        : "transparent"
    }`;
  return (
    <>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        id="but1"
        ref={ref}
      >
        Success
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

                <h2 ref={tex}>Success</h2>
                <p ref={tex2}></p>
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

      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        id="but3"
        data-bs-target="#exampleModal2"
        ref={ref2}
      >
        Failed
      </button>

      <div
        className="modal fade"
        id="exampleModal2"
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
                className="modalbox error col-sm-8 col-md-6 col-lg-5 center animate"
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
                    className="fa-solid fa-xmark"
                    style={{ color: "#ffffff", fontSize: "5rem" }}
                  ></i>
                </div>

                <h1>Login Failed</h1>
                <p>Please check your email or password and try again</p>
              </div>
              <button
                type="button"
                id="but4"
                className="btn-close d-none"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={cref2}
              ></button>
            </div>
          </div>
        </div>
      </div>
      <div className="background">
        <section
          className="gradient-form"
        >
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-xl-10">
                <div
                  className="car rounded-3 text-black"
                  style={{ backgroundColor: "white" }}
                >
                  <div className="row g-0">
                    <div className="col-lg-6" style={{ zIndex: "2" }}>
                      <div className="card-body p-md-5 mx-md-4">
                        <div className="text-center">
                          <img
                            className="logupimg"
                            src="./logo512.png"
                            alt="logo"
                          />
                          <h3 className="mt-1 mb-5 pb-1 text-black">
                            <strong>Log In</strong>
                          </h3>
                        </div>

                        <form>
                          <p
                            className="text-black"
                            style={{
                              paddingLeft: `${
                                window.innerWidth < 1024 ? "1rem" : "0rem"
                              }`,
                            }}
                          >
                            <strong>Login to your account</strong>
                          </p>

                          <div
                            className="form-floating flex-fill mb-3"
                            id="floaterlog1"
                          >
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              name="email"
                              value={credentials.email}
                              placeholder="name@example.com"
                              autoComplete="email"
                              onChange={onchange}
                              style={{
                                width: `${
                                  window.innerWidth < 1024 ? "90%" : "100%"
                                }`,
                              }}
                            />
                            <label
                              htmlFor="email"
                              style={{
                                padding: `${
                                  window.innerWidth < 1024
                                    ? "1rem 2rem"
                                    : "1rem 0.75rem"
                                }`,
                              }}
                            >
                              Your Email
                            </label>
                          </div>

                          <div
                            className="form-floating flex-fill mb-3"
                            id="floaterlog2"
                          >
                            <input
                              type="password"
                              className="form-control"
                              id="password"
                              name="password"
                              value={credentials.password}
                              placeholder="Password"
                              autoComplete="new-password"
                              onChange={onchange}
                              style={{
                                width: `${
                                  window.innerWidth < 1024 ? "90%" : "100%"
                                }`,
                              }}
                            />
                            <label
                              htmlFor="password"
                              style={{
                                padding: `${
                                  window.innerWidth < 1024
                                    ? "1rem 2rem"
                                    : "1rem 0.75rem"
                                }`,
                              }}
                            >
                              Password
                            </label>
                          </div>

                          <div className="text-center pt-1 mb-5 pb-1">
                            <button
                              className="btn text-white fa-lg gradient-custom-2 mx-3"
                              style={{ padding: "1.2rem", borderRadius: "0px" }}
                              onClick={handleSubmit}
                            >
                              Log in
                            </button>
                            {/* <a className="text-muted" href="#!">
                          Forgot password?
                        </a> */}
                          </div>

                          <div className="d-flex align-items-center justify-content-center pb-4">
                            <p className="mb-0 me-2 text-black">
                              Don't have an account?
                            </p>
                            {/* <button type="button" className=""> */}
                            <Link
                              to="/signup"
                              className="btn btn-outline-danger"
                            >
                              Create new
                            </Link>

                            {/* </button> */}
                          </div>
                        </form>
                      </div>
                    </div>
                    <div
                      className="col-lg-6 d-flex align-items-center gradient-custom-2"
                      style={{ zIndex: "2" }}
                    >
                      <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                        <h2 className="mb-4">It's so good to see you again</h2>
                        <p className="mb-0 my-2">
                        Welcome back! Log in now to access your notes and join our vibrant community chat. Connect with like-minded individuals, share ideas, and collaborate in real-time while enjoying the convenience of secure note-taking.
                        </p>
                        <p className="mb-0 my-2">
                          With our MERN stack web application, you can trust
                          that your personal information is protected by
                          top-tier security measures. Our user authentication
                          system ensures that only authorized users have access
                          to your account, providing you with peace of mind
                          every time you log in.
                        </p>
                        <p className="mb-0 my-2">
                          Experience the convenience of a user-friendly
                          interface coupled with the assurance of robust
                          security. Log in now to unleash your creativity, stay
                          organized, and take control of your productivity
                          journey with <strong>CozyNotes</strong>.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
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

export default Login;
