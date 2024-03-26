import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
function Notes(props) {
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
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setnote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
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
  return (
    <>
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
      <div className="list-group rounded-0" id="editnote">
        <h3 style={{ padding: "1rem 0rem 1rem 1rem" }}>Your Notes: </h3>
        {notes
          .slice()
          .reverse()
          .map((note) => {
            return (
              <NoteItem
                toggle={props.toggle}
                key={note._id}
                note={note}
                updateNote={updateNote}
              />
            );
          })}
        {/* we use && when we dont have anything in else*/}
        <div
          className="list-group-ite border-0"
          style={{
            fontSize: "larger",
            backgroundColor: "transparent",
            color: "white",
            padding: "0rem 0rem 0rem 1rem",
          }}
        >
          {notes.length === 0 &&
            "Yours Notebook seems empty. Create a note now!!"}
        </div>
      </div>
    </>
  );
}

export default Notes;
