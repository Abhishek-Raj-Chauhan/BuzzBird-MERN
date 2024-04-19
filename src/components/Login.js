import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./Logc.css";
import Spinner from "./Spinner";
const Login = () => {
  if (document.getElementById("navBar"))
    document.getElementById("navBar").style.background = `${
      window.innerWidth < 991
        ? "linear-gradient(to right, #833ab4 , #2720a1,#121120 )"
        : "transparent"
    }`;
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      history.push("/home");
    } else {
      history.push("/");
    }
  }, [history]);

  const [credentials, setcredentials] = useState({ email: "", password: "" , cpassword:""});
  const onchange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  const ref = useRef(null);
  const cref = useRef(null);
  const ref2 = useRef(null);
  const cref2 = useRef(null);
  const ref3 = useRef(null);
  const cref3 = useRef(null);
  const tex = useRef(null);
  const tex2 = useRef(null);
  const tex3 = useRef(null);
  const tex4 = useRef(null);
  const [otpe, setotpe] = useState("");
  const [esend, setesend] = useState(false);
  const [everify, seteverify] = useState(false);
  const [forgot, setforgot] = useState(true);
  const [flager, setflager] = useState(false);
  const updateNote = (ref, cref, time) => {
    ref.current.click();
    setTimeout(() => {
      cref.current.click();
    }, time);
  };
  
  const [redirect, setredirect] = useState(false);
  const [redirect2, setredirect2] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("state")) {
      if (tex.current) tex.current.textContent = "LogOut Succesful";
      if (tex2.current) tex2.current.textContent = "Have a great day..";
      updateNote(ref, cref, 1800);
      localStorage.clear();
    }
  }, []);

  useEffect(() => {
    const isRef3Clicked = localStorage.getItem("isRef3Clicked");
  
    // Check if ref3.current.click() has already been executed
    if (!isRef3Clicked && window.performance.getEntriesByType('navigation').length > 0) {
      // Execute ref3.current.click() only once when the component mounts
      ref3.current.click();
      // Set a flag in localStorage to indicate that ref3.current.click() has been executed
      localStorage.setItem("isRef3Clicked", "true");
    }
  
    // Cleanup function to remove isRef3Clicked from localStorage before page reload
    const cleanupBeforeUnload = () => {
      localStorage.removeItem("isRef3Clicked");
    };
  
    // Listen to beforeunload event for cleanup
    window.addEventListener("beforeunload", cleanupBeforeUnload);
  
    // Cleanup listener when component unmounts
    return () => {
      window.removeEventListener("beforeunload", cleanupBeforeUnload);
    };
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); 
    const response = await fetch(
      `https://cozynotes-mern.onrender.com/api/auth/login`,
      {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      }
    );

    const json = await response.json();
    setIsLoading(false); 
    if (json.success) {
      //save the auth token and redirect
      localStorage.setItem("token", json.authToken);
      localStorage.setItem("logtime", json.currentTime);
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
  const handleforGotPass1 = async (e) => {
    e.preventDefault();
    setflager(true);
    if(credentials.email!==''){
      let dataSend = {
        email: credentials.email,
      };
      setIsLoading(true); 
      const res = await fetch(`https://cozynotes-mern.onrender.com/email/sendEmail`, {
        method: "POST",
        body: JSON.stringify(dataSend),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const json = await res.json();
      setIsLoading(false); 
      if (json.success) {
        setforgot(false);
        setesend(true);
        if (tex.current) tex.current.textContent = "Otp sent Successfully";
        if (tex2.current)
          tex2.current.textContent = "The window will close automatically";
        updateNote(ref, cref, 1000);
      }
    }
    else{
      if (tex3.current) tex3.current.textContent = "Enter email";
      if (tex4.current) tex4.current.textContent = "Registered email should be entered";
      updateNote(ref2, cref2, 1500);
    }
    
  };
  const handleforGotPass2 = async (e) => {
    e.preventDefault();
    let dataSend = {
      otp: otpe,
    };
    setIsLoading(true); 
    const res = await fetch(`https://cozynotes-mern.onrender.com/email/verifyEmail`, {
      method: "POST",
      body: JSON.stringify(dataSend),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();
    setIsLoading(false); 
    if (json.success) {
      seteverify("true");
      if (tex.current) tex.current.textContent = "Verification Successful";
      if (tex2.current)
        tex2.current.textContent = "The window will close automatically";
      updateNote(ref, cref, 1000);
      console.log("otp verification successfull");
    }
    else{
      if (tex3.current) tex3.current.textContent = "Invalid OTP";
      if (tex4.current) tex4.current.textContent = "Please check OTP sent to your email";
      updateNote(ref2, cref2, 1500);
    }
  };
  const handleforGotPass3 = async (e) => {
    e.preventDefault();
    setIsLoading(true); 
    const { email, password , cpassword} = credentials;  
    if(password===cpassword){
      const response = await fetch(
        `https://cozynotes-mern.onrender.com/api/auth/updateUser`,
        {
          method: "PUT",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
  
      const json = await response.json();
      setIsLoading(false); 
      //save the auth token and redirect
      if (json.success) {
        setredirect2(true);
      } else {
        setredirect2(false);
        if (tex3.current) tex3.current.textContent = "Server Error";
        if (tex4.current)
          tex4.current.textContent = "Please try again after some time";
        updateNote(ref2, cref2, 1500);
        console.log(json);
      }
    }
    else{
      setIsLoading(false); 
      if (tex3.current) tex3.current.textContent = "Password Mismatch";
        if (tex4.current)
          tex4.current.textContent = "Please enter same confirm password";
        updateNote(ref2, cref2, 1500);
    }
    
  };
  if (redirect === true) {
    setTimeout(() => {
      history.push("/home");
    }, 1100);
  }
  if (redirect2 === true) {
    if (tex.current) tex.current.textContent = "Password changed Successfully";
    if (tex2.current) tex2.current.textContent = "You can login now";
    updateNote(ref, cref, 1800);
    setTimeout(() => {
        history.push("/");
        window.location.reload();
    }, 2000);
}


    useEffect(() => {
      const timeoutRef = localStorage.getItem("logtime");
      const currentTime = new Date().toISOString();

      const tenMinutesInMilliseconds = 10 * 60 * 1000; // 10 minutes in milliseconds

      // Calculate the difference between current time and timeout reference time
      const timeDifference = new Date(currentTime) - new Date(timeoutRef);

      // Check if the time difference exceeds 10 minutes
      if (timeDifference >= tenMinutesInMilliseconds) {
        // Perform your action here, e.g., logout the user
        localStorage.removeItem("logtime")
        localStorage.removeItem("token");
        // Redirect to login page or any other desired action after logout
        history.push("/");
      } else {
        const currentTime2 = new Date().toISOString();
        localStorage.setItem("logtime",currentTime2);
      }
      
    }, [history]);

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
                  id="iyer6"
                >
                  <i
                    className="fa-solid fa-check"
                    id="iyer5"
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
                  // style={{
                  //   height: "10rem",
                  //   width: "10rem",
                  //   marginBottom: "2rem",
                  // }}
                  id="iyer4"
                >
                  <i
                    className="fa-solid fa-xmark"
                    id="iyer3"
                  ></i>
                </div>

                <h1 ref={tex3}>Login Failed</h1>
                <p ref={tex4}>Please check your email or password and try again</p>
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

      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        id="but4"
        data-bs-target="#exampleModal3"
        ref={ref3}
      >
        Info
      </button>

      <div
        className="modal fade"
        id="exampleModal3"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog d-flex justify-content-center align-items-center"
          style={{ height: "100%" }}
        >
          <div className="modal-content d-flex flex-row justify-content-center align-items-center">
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
                  id="iyer2"
                >
                  <i id="iyer" class="fa-solid fa-info"></i>
                </div>

                <h1 className="infohead">Important Note!</h1>
                <p className="infopara">
                  As I'm on a free hosting plan, the server may temporarily spin
                  down after 15 minutes of inactivity. Please refresh the page once or twice if login/signup dont work. Please be patient for the
                  initial load, subsequent interactions will be smooth.
                </p>
              </div>
              <div
                className="closer"
                style={{
                  display: "flex",
                  height: "100%",
                  justifyContent: "flex-start",
                  width: "0rem",
                }}
              >
                <button
                  type="button"
                  id="but4"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  ref={cref3}
                  style={{ margin: "-1rem -1rem" }}
                ></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isLoading && <Spinner/>}
      <div className="background">
        <section className="gradient-form">
          <div
            className="container py-5"
            style={{
              minHeight: "100vh",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div className="row d-flex justify-content-center align-items-center" id="rower2">
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
                            <strong>{forgot ? `Log In`:`Reset Password`}</strong>
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
                            <strong>{forgot ? `Login to your account`:`Enter new credentials`}</strong>
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
                          {
                            !flager && <div
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
                          }
                          {esend && everify && (
                            <div
                              className="form-floating flex-fill mb-3"
                              id="floatersign3"
                            >
                              <input
                                type="password"
                                className="form-control"
                                id="password2"
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
                          )}
                          {esend && everify && (
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
                          )}
                          {esend && !everify && (
                            <div
                              className="form-floating flex-fill mb-3"
                              id="floatersign4"
                            >
                              <input
                                type="text"
                                className="form-control"
                                id="otpe"
                                name="otpe"
                                value={otpe}
                                minLength={5}
                                required
                                onChange={(e) => setotpe(e.target.value)}
                                placeholder="OTP"
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
                                Enter OTP you received
                              </label>
                            </div>
                          )}
                          <div className="buttons d-flex justify-content-center flex-row">
                          {
                            !flager && <div className="text-center pt-1 mb-5 pb-1">
                            <button
                              className="btn text-white fa-lg gradient-custom-2 mx-3"
                              style={{ padding: "1.2rem", borderRadius: "0px" }}
                              onClick={handleSubmit}
                            >
                              Log in
                            </button>
                          </div>
                          }
                          
                          {
                            esend && !everify && <div className="text-center pt-1 mb-5 pb-1">
                            <button
                              className="btn text-white fa-lg gradient-custom-2 mx-3"
                              style={{ padding: "1.2rem", borderRadius: "0px" }}
                              onClick={handleforGotPass2}
                            >
                              Verify OTP
                            </button>
                          </div>
                          }
                          {
                            esend && everify && <div className="text-center pt-1 mb-5 pb-1">
                            <button
                              className="btn text-white fa-lg gradient-custom-2 mx-3"
                              style={{ padding: "1.2rem", borderRadius: "0px" }}
                              onClick={handleforGotPass3}
                            >
                              Reset Password
                            </button>
                          </div>
                          }
                          
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
                          <div className="d-flex align-items-center justify-content-center pb-4">
                          {
                            forgot && <>
                            <p className="mb-0 me-2 text-black">
                              Forgot Password?
                            </p>
                            <button
                              className="btn btn-outline-primary"
                              onClick={handleforGotPass1}
                            >
                              Forgot Password
                            </button>
                          </>
                          }
                          </div>
                        </form>
                      </div>
                    </div>
                    <div
                      className="col-lg-6 gradient-custom-2"
                      style={{ zIndex: "2"}}
                    >
                      <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                        <h2 className="mb-4">It's so good to see you again</h2>
                        <p className="mb-0 my-2">
                          Welcome back! Log in now to access your notes and join
                          our vibrant community chat. Connect with like-minded
                          individuals, share ideas, and collaborate in real-time
                          while enjoying the convenience of secure note-taking.
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
