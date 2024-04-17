import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./Logc.css";
const Signup = () => {
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const onchange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  let history = useHistory();
  const [redirect, setredirect] = useState(false);
  const ref = useRef(null);
  const cref = useRef(null);
  const ref2 = useRef(null);
  const cref2 = useRef(null);
  const tex = useRef(null);
  const tex2 = useRef(null);
  const tex3 = useRef(null);
  const tex4 = useRef(null);
  const updateNote = (ref, cref, time) => {
    ref.current.click();
    setTimeout(() => {
      cref.current.click();
    }, time);
  };
  const handlesignUp = async (e) => {
    const { name, email, password } = credentials;
    e.preventDefault();
    const response = await fetch(`https://cozynotes-mern.onrender.com/api/auth/createuser`,
      {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      }
    );

    const json = await response.json();
    //save the auth token and redirect
    if (json.success) {
      if (tex.current) tex.current.textContent = "Account Created Successfully";
      if (tex2.current)
        tex2.current.textContent = "The window will close automatically";
      localStorage.setItem("token", json.authToken);
      updateNote(ref, cref, 1000);
      setredirect(true);
    } else {
      setredirect(false);
      if (tex3.current) tex3.current.textContent = "Server Error";
      if (tex4.current)
        tex4.current.textContent = "Please try again after some time";
      updateNote(ref2, cref2, 1500);
      console.log(json);
    }
  };
  if (redirect === true) {
    setTimeout(() => {
      history.push("/home");
    }, 1100);
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

                <h3 ref={tex}>Success</h3>
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

                <h1 ref={tex3}>Error</h1>
                <p ref={tex4}></p>
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
        <section className="gradient-form">
          <div className="container py-5">
            <div className="row d-flex justify-content-center align-items-center" id="rower">
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
                            <strong>Sign Up</strong>
                          </h3>
                        </div>

                        <form onSubmit={handlesignUp}>
                          <p
                            style={{
                              paddingLeft: `${
                                window.innerWidth < 1024 ? "1rem" : "0rem"
                              }`,
                            }}
                          >
                            <strong>Create your account</strong>
                          </p>
                          <div
                            className="form-floating flex-fill mb-3"
                            id="floatersign1"
                          >
                            <input
                              type="text"
                              className="form-control"
                              id="name"
                              name="name"
                              value={credentials.name}
                              minLength={3}
                              required
                              onChange={onchange}
                              placeholder="Boris Mehta"
                              autoComplete="myname"
                              style={{
                                width: `${
                                  window.innerWidth < 1024 ? "90%" : "100%"
                                }`,
                              }}
                            />
                            <label
                              style={{
                                padding: `${
                                  window.innerWidth < 1024
                                    ? "1rem 2rem"
                                    : "1rem 0.75rem"
                                }`,
                              }}
                              htmlFor="name"
                            >
                              Your Name
                            </label>
                          </div>
                          <div
                            className="form-floating flex-fill mb-3"
                            id="floatersign2"
                          >
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              name="email"
                              value={credentials.email}
                              onChange={onchange}
                              placeholder="name@example.com"
                              autoComplete="email"
                              style={{
                                width: `${
                                  window.innerWidth < 1024 ? "90%" : "100%"
                                }`,
                              }}
                            />
                            <label
                              style={{
                                padding: `${
                                  window.innerWidth < 1024
                                    ? "1rem 2rem"
                                    : "1rem 0.75rem"
                                }`,
                              }}
                              htmlFor="email"
                            >
                              Your Email
                            </label>
                          </div>

                          <div
                            className="form-floating flex-fill mb-3"
                            id="floatersign3"
                          >
                            <input
                              type="password"
                              className="form-control"
                              id="password"
                              name="password"
                              value={credentials.password}
                              minLength={5}
                              required
                              onChange={onchange}
                              placeholder="Password"
                              autoComplete="new-password"
                              style={{
                                width: `${
                                  window.innerWidth < 1024 ? "90%" : "100%"
                                }`,
                              }}
                            />
                            <label
                              style={{
                                padding: `${
                                  window.innerWidth < 1024
                                    ? "1rem 2rem"
                                    : "1rem 0.75rem"
                                }`,
                              }}
                              htmlFor="password"
                            >
                              Password
                            </label>
                          </div>
                          <div
                            className="form-floating flex-fill mb-3"
                            id="floatersign4"
                          >
                            <input
                              type="password"
                              className="form-control"
                              id="cpassword"
                              name="cpassword"
                              value={credentials.cpassword}
                              minLength={5}
                              required
                              onChange={onchange}
                              placeholder="Password"
                              autoComplete="new-password"
                              style={{
                                width: `${
                                  window.innerWidth < 1024 ? "90%" : "100%"
                                }`,
                              }}
                            />
                            <label
                              style={{
                                padding: `${
                                  window.innerWidth < 1024
                                    ? "1rem 2rem"
                                    : "1rem 0.75rem"
                                }`,
                              }}
                              htmlFor="password"
                            >
                              Confirm Password
                            </label>
                          </div>
                          <div className="text-center pt-1 mb-5 pb-1">
                            <button
                              className="btn btn-primary btn-block fa-lg gradient-custom-2 mx-3"
                              type="submit"
                              style={{ padding: "1.2rem", borderRadius: "0px" }}
                            >
                              Register
                            </button>
                            
                            {/* <a className="text-muted" href="#!">
                        Forgot password?
                      </a> */}
                          </div>
                        </form>
                      </div>
                    </div>
                    <div
                      className="col-lg-6 d-flex align-items-center gradient-custom-2"
                      style={{ zIndex: "2" }}
                    >
                      <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                        <h2 className="mb-4">
                          Welcome to <strong>CozyNotes</strong>
                        </h2>
                        <p className="mb-0 my-2">
                          Sign up now and unlock a world of seamless note-taking
                          capabilities, unparalleled security features, and
                          access to our vibrant community chat.
                        </p>
                        <p className="mb-0 my-2">
                          Creating an account with us is quick, easy, and
                          secure. Simply fill out the registration form to gain
                          access to our intuitive note-taking interface, where
                          you can capture your thoughts, ideas, and inspirations
                          effortlessly.
                        </p>
                        <p className="mb-0 my-2">
                          At <strong>CozyNotes</strong>, we prioritize the
                          security and privacy of your personal information.
                          Rest assured that your data is protected by
                          industry-leading security measures, ensuring that only
                          you have access to your notes.
                        </p>
                        <p className="mb-0 my-2">
                          Join our growing community of users who trust us with
                          their note-taking needs and experience the perfect
                          blend of functionality, convenience, and security.
                          Sign up now and take the first step towards a more
                          organized and productive life with{" "}
                          <strong>CozyNotes</strong>.
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

export default Signup;
