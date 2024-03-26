import React from "react";
import { useContext, useState, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import userContext from "../context/user/userContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./note.css";
import Alert from "./Alert";
const AddNote = (props) => {
  const context2 = useContext(userContext);
  const { userdata, fetchUserData } = context2;
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setnote] = useState({ title: "", description: "", tag: "" });

  const handleAddNote = (event) => {
    event.preventDefault();
    addNote(note.title, note.description, note.tag);
    setnote({ title: "", description: "", tag: "" });
    props.toggle("add");
  };
  const onchange = (event) => {
    setnote({ ...note, [event.target.name]: event.target.value });
  };
  let history = useHistory();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/");
    } else {
      fetchUserData();
    }
    // eslint-disable-next-line
  }, [history]);
  function calcHeight(value) {
    let numberOfLineBreaks = (value.match(/\n/g) || []).length;
    return numberOfLineBreaks;
  }
  return (
    <div className="list-group" id="newnote">
      <Alert alerter={props.alerter} />
      <h1 id="headingaddnotemobile">
        <span style={{ fontWeight: "normal" }}>hey </span>
        <b>{userdata.name}</b> Add a Note{" "}
      </h1>
      <form
        className="contain d-flex flex-column align-items-start"
        id="formaddnote"
      >
        <div className="mb-3" style={{ width: "100%" }}>
          <label htmlFor="Note title" className="form-label">
            Title
          </label>
          <input
            className="form-control shadow-none"
            placeholder="start by giving a title"
            id="title"
            name="title"
            onChange={onchange}
            value={note.title}
            style={{
              background:
                "linear-gradient(to right, #833ab4, #2720a1, #121120)",
              border: "none",
              color: "white",
            }}
          />
        </div>
        <div className="mb-3" style={{ width: "100%" }}>
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control shadow-none override-height"
            id="description"
            name="description"
            onChange={onchange}
            value={note.description}
            rows={calcHeight(note.description) + 10}
            style={{
              background:
                "linear-gradient(to right, #833ab4, #2720a1, #121120)",
              border: "none",
              color: "white",
            }}
          ></textarea>
        </div>
        <div className="mb-3" style={{ width: "100%" }}>
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            id="tag"
            name="tag"
            placeholder="Add tag"
            className="form-control shadow-none"
            onChange={onchange}
            value={note.tag}
            style={{
              background:
                "linear-gradient(to right, #833ab4, #2720a1, #121120)",
              border: "none",
              color: "white",
            }}
          />
        </div>
        <button
          disabled={note.title.length < 5 || note.description.length < 5}
          type="submit"
          className="btn btn-info"
          style={{ color: "black", margin: "1rem 0rem 2rem 0rem" }}
          onClick={handleAddNote}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
