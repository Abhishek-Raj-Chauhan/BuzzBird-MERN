import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import "./note.css";
import NoteImgContext from "../context/notes/NoteImgContext";
const Mynoteitem = (props) => {
  const { note, updateNote, index } = props;
  const [isFlipped, setIsFlipped] = useState(false);
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const context2 = useContext(NoteImgContext);
  const { imageUrls } = context2;

  const handleMouseEnter = () => {
    setIsFlipped(true);
  };

  const handleMouseLeave = () => {
    setIsFlipped(false);
  };

  return (
    <div
      className={`col-${window.innerWidth > 600 ? "3" : "md"}`}
      style={{ marginTop: "1rem" }}
    >
      <div
        className="card "
        style={{
          width: "100%",
          height: `${window.innerWidth > 600 ? "30rem" : "26rem"}`,
          marginBottom: "2rem",
          border: "1px solid white",
          zIndex: "2",
        }}
      >
        <img
          className="card-img-top"
          src={imageUrls[index]}
          alt=""
          onClick={() => {
            updateNote(note);
          }}
        />
        <div
          className="card-body"
          onClick={() => {
            updateNote(note);
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            padding: "1rem 1rem 0rem 1rem",
            marginBottom: "1rem",
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
        <div
          id="btongrp"
          className="butgrp d-flex justify-content-between align-items-center"
          style={{ width: "100%", border: "1px solid white" }}
        >
          <div id="btn1" className="d-flex justify-content-center flex-row">
            <button
              className="mx-2"
              style={{ border: "0px", backgroundColor: "inherit" }}
              onClick={() => {
                deleteNote(note._id);
                props.toggle("delete");
              }}
            >
              <i
                className={`fa-solid fa-trash ${
                  isFlipped ? "fa-bounce" : ""
                } mx-2`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ color: "white", fontSize: "large" }}
              ></i>
            </button>
          </div>
          <div id="btn2" className="d-flex justify-content-center flex-row">
            <button
              className="mx-2"
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
      </div>
    </div>
  );
};

export default Mynoteitem;
