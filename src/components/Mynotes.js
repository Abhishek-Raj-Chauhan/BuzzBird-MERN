import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import noteContext from "../context/notes/noteContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Mynoteitem from "./Mynoteitem";
import Alert from "./Alert";
const Mynotes = (props) => {
  const context = useContext(noteContext);
  const { notes, fetchAllNotes, editNote } = context;
  let history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchAllNotes();
    } else {
      history.push("/");
    }
  }, [fetchAllNotes, history]);
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setnote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
    imgUrl: "",
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setnote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
      imgUrl: currentNote.imgUrl,
    });
  };
  const handleEdit = () => {
    refClose.current.click();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    props.toggle("edit");
  };
  const onchange = (event) => {
    setnote({ ...note, [event.target.name]: event.target.value });
  };
  if (document.getElementById("navBar")) document.getElementById("navBar").style.background ='transparent';
  return (
    <>
      <div
        className="ale"
        style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
      >
        <Alert alerter={props.alerter} />
      </div>

      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade bd-example-modal-lg"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-lg d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div
            className="modal-content"
            style={{
              height: "80%",
              backgroundColor: "#000021",
              color: "white",
            }}
          >
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close bg-light"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form
                className="contain d-flex flex-column justify-content-evenly align-items-center"
                style={{ height: "100%", width: "100%" }}
              >
                <div className="mb-3" style={{ width: "100%", height: "15%" }}>
                  <label htmlFor="Note title" className="form-label">
                    Title
                  </label>
                  <input
                    className="form-control"
                    style={{
                      background:
                        "linear-gradient(to right, #833ab4, #2720a1, #121120)",
                      border: "none",
                      color: "white",
                    }}
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    placeholder="your title"
                    onChange={onchange}
                  />
                </div>
                <div className="mb-3" style={{ width: "100%", height: "70%" }}>
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    rows="3"
                    value={note.edescription}
                    style={{
                      height: "90%",
                      background:
                        "linear-gradient(to right, #833ab4, #2720a1, #121120)",
                      border: "none",
                      color: "white",
                    }}
                    onChange={onchange}
                  ></textarea>
                </div>
                <div className="mb-3" style={{ width: "100%", height: "15%" }}>
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    id="etag"
                    name="etag"
                    value={note.etag}
                    className="form-control"
                    style={{
                      background:
                        "linear-gradient(to right, #833ab4, #2720a1, #121120)",
                      border: "none",
                      color: "white",
                    }}
                    onChange={onchange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary d-none"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 5
                }
                type="button"
                className="btn btn-info"
                onClick={handleEdit}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="background">
        <div className="row" id="mynotesrow">
          <h3 style={{ zIndex: "2" }}>Your Notes: </h3>
          {/* we use && when we dont have anything in else*/}

          {notes.length === 0 && (
            <div className="container m-3" style={{ fontSize: "larger" }}>
              "Yours Notebook seems empty. Create a note now!!"
            </div>
          )}

          {notes.map((note, index) => {
            return (
              <Mynoteitem
                toggle={props.toggle}
                alerter={props.alerter}
                key={note._id}
                note={note}
                updateNote={updateNote}
                //this is giving unique index every time to noteitem
                index={index % 12}
              />
            );
          })}
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

export default Mynotes;
