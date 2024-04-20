import {useContext} from "react";
import "./note.css";
import noteContext from "../context/notes/noteContext";
const NotePrev = (props) => {
  const context = useContext(noteContext);
  const {note} = context;
  return (
    <div className="carder" id="ntitem3">
      <div
        className="container"
      >
        <h3 id="heady">
          {note.title}
        </h3>
        <p id="prevy">
          {note.description}
        </p>
        <p id="tagy">
          {note.tag}
        </p>
      </div>
      </div>
  );
};

export default NotePrev;
