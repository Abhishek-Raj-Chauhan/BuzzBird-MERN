import {useContext} from "react";
import Notes from "./Notes";
import AddNote from "./AddNote";
import noteContext from "../context/notes/noteContext";
import NotePrev from "./NotePrev";
const Home = (props) => {
  if (document.getElementById("navBar")){
    document.getElementById("navBar").style.background =
      "linear-gradient(to right, #833ab4, #2720a1, #121120)";
  }
  const context = useContext(noteContext);
  const { noteprev} = context;
  return (
    <>
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
        {window.innerWidth > 600 && !noteprev ? (
          <AddNote toggle={props.toggle} alerter={props.alerter} />
        ) : window.innerWidth > 600 && noteprev? (
          <NotePrev/>
        ):""}
      </div>
    </>
  );
};

export default Home;
