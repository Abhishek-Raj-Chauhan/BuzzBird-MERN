import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import "./note.css";
const NoteItem = (props) => {
  const { note, updateNote } = props;
  const [isFlipped, setIsFlipped] = useState(false);
  const context = useContext(noteContext);
  const { deleteNote , prevNote} = context;
  const handleMouseEnter = () => {
    setIsFlipped(true);
  };
  const handleMouseLeave = () => {
    setIsFlipped(false);
  };
  return (
    <div className="card rounded-0" id="ntitem">
      <div
        className="card-body"
        onClick={() => {
          prevNote(note);
        }}
      >
        <h5 className="card-title">
          {note.title.length > 28
            ? note.title.slice(0, 28) + "..."
            : note.title}
        </h5>
        <p className="card-text">
          {note.description.length > 50
            ? note.description.slice(0, 50) + "..."
            : note.description}
        </p>
        <p className="card-text">
          {note.tag.length > 28 ? note.tag.slice(0, 28) + "..." : note.tag}
        </p>
      </div>
      <div className="butt my-2 d-flex justify-content-between">
        <button
          className="mx-4"
          id="del"
          style={{ border: "0px", backgroundColor: "inherit" }}
          onClick={() => {
            deleteNote(note._id);
            props.toggle("delete");
          }}
        >
          <i
            className={`fa-solid fa-trash ${isFlipped ? "fa-bounce" : ""} mx-2`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ color: "white", fontSize: "large" }}
          ></i>
        </button>
        <button
          className="mx-4"
          id="ed"
          style={{ border: "0px", backgroundColor: "inherit" }}
          onClick={() => {
            updateNote(note);
          }}
        >
          <i
            className={`fa-solid fa-pen-to-square ${
              isFlipped ? "fa-flip" : ""
            } mx-2`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ color: "white", fontSize: "large" }}
          ></i>
        </button>
      </div>
    </div>
  );
};

export default NoteItem;
