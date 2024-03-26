import React from "react";
import "../App.css";

const About = () => {
  if (document.getElementById("navBar"))
    document.getElementById("navBar").style.background = "transparent";

  return (
    <>
      <div class="background">
        <div
          className="container d-flex justify-content-center align-items-center gradient-custom-2"
          style={{
            width: "100vw",
            background: "transparent",
            marginTop: "5rem",
          }}
        >
          <div
            id="cardib"
            className="card"
            style={{ width: "50rem", zIndex: "2" }}
          >
            <img src="./logo192.png" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">About</h5>
              <p className="card-text">
                Welcome to our MERN (MongoDB, Express.js, React.js, Node.js)
                stack web application, where creativity meets security. At
                CozyNotes, we're dedicated to providing you with a seamless
                note-taking experience coupled with robust user authentication.
                With our intuitive interface, you can effortlessly create,
                delete, and edit your notes, ensuring that your thoughts and
                ideas are captured and organized exactly as you envision.
                Whether you're a student, professional, or creative enthusiast,
                our platform empowers you to stay productive and organized in
                your daily endeavors. But it doesn't stop there security is at
                the forefront of everything we do. We understand the importance
                of safeguarding your personal information, which is why we've
                implemented stringent user authentication measures to ensure
                that your data remains secure and private. You can rest assured
                that your notes are for your eyes only. Join our community of
                users who trust us with their note-taking needs and experience
                the perfect blend of functionality, convenience, and security.
                Welcome to CozyNotes, where your ideas are safe, and your
                productivity knows no bounds.
              </p>
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

export default About;
