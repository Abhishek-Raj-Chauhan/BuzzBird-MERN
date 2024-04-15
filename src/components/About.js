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
                Welcome to CozyNotes, your destination for a seamless
                note-taking experience fortified by top-tier security. Built on
                the MERN (MongoDB, Express.js, React.js, Node.js) stack, our
                platform is where creativity meets security. At CozyNotes, we're
                committed to providing you with an intuitive note-taking
                interface alongside robust user authentication. Our platform
                empowers students, professionals, and creative enthusiasts alike
                to effortlessly capture, organize, and manage their thoughts and
                ideas. But that's not all! We understand the value of
                collaboration and connection. That's why CozyNotes offers a
                vibrant community chat feature. Engage with like-minded
                individuals, share ideas, and collaborate in real-time right
                within our platform. Whether you're seeking inspiration,
                feedback, or simply want to connect with others, our community
                chat is the perfect space for meaningful interactions. Security
                remains paramount in everything we do. We've implemented
                stringent user authentication measures, ensuring that your data
                remains secure and private. Your notes are exclusively for your
                eyes. Join our growing community of users who trust us with
                their note-taking needs. Experience the perfect fusion of
                functionality, convenience, and security at CozyNotes. Welcome
                to a place where your ideas are safe, and your productivity
                knows no bounds.
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
