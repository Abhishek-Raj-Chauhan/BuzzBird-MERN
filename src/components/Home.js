import React from "react";
import Notes from "./Notes";
import AddNote from "./AddNote";
import Navbar from "./components/Navbar";
const Home = (props) => {
  if (document.getElementById("navBar"))
    document.getElementById("navBar").style.background = `${
      window.innerWidth < 991
        ? "linear-gradient(to right, #833ab4 , #2720a1,#121120 )"
        : "transparent"
    }`;
  return (
    <>
      <Navbar/>
      <div
        className="wrapper"
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "flex-start",
          background: "linear-gradient(to right, #833ab4, #2720a1, #121120)",
        }}
      >
        <Notes toggle={props.toggle} />
        {window.innerWidth > 600 ? (
          <AddNote toggle={props.toggle} alerter={props.alerter} />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Home;
