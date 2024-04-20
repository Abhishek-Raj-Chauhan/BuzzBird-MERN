import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "https://cozynotes-mern.onrender.com";
  // console.log(noteContext)
  const notesIni = [];
  const chatsIni = [];
  const [notes, setnotes] = useState(notesIni);
  const [chats, setchats] = useState(chatsIni);
  
  const fetchAllNotes = async () => {
    // API CALL
    const response = await fetch(`${host}/api/notes/fetchallNotes`, {
      method: "GET",
      credentials: "same-origin",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setnotes(json);
  };
  const fetchAllChats = async () => {
    // API CALL
    const response = await fetch(`${host}/api/chatmsg/fetchChats`, {
      method: "GET",
      credentials: "same-origin",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setchats(json);
  };
  const addChat = async (msg) => {
    // API CALL
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/chatmsg/addChat`, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({msg}),
    });
    const chat = await response.json();
    // setnotes(notes.push(note)) //Concat returns the array whearas push updates the array
    setchats(chats.concat(chat));
  };
  const addNote = async (title, description, tag) => {
    // API CALL
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/addNote`, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    // setnotes(notes.push(note)) //Concat returns the array whearas push updates the array
    setnotes(notes.concat(note));
  };
  //Delete a note
  const deleteNote = async (id) => {
    // API CALL
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
      method: "DELETE",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    // const json = await response.json();
    // console.log(json)
    console.log("Note has been deleted with id : " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newNotes);
  };

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //API Call
    // eslint-disable-next-line
    console.log("http://localhost:3000/20f10b93-ec4b-4cb7-bed9-3f998f151db5");
    const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
      method: "PUT",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    console.log(response);
    // Logic to edit in client {if this logic does not work use below}
    for (let i = 0; i < notes.length; i++) {
      const element = notes[i];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }

    // Logic 2
    // const newNotes = JSON.parse(JSON.stringify(notes));

    // for (let i = 0; i < newNotes.length; i++) {
    //   if (newNotes[i]._id === id) {
    //     newNotes[i].title = title;
    //     newNotes[i].description = description;
    //     newNotes[i].tag = tag;
    //     break;
    //   }
    // }
    // setnotes(newNotes);
  };
  //Edit a note
  
  const [noteprev, setnoteprev] = useState(false);
  const [note, setnote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const prevNote = (currentNote) => {
    setnoteprev(true);
    setnote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
    console.log(currentNote);
  };

  return (
    <noteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, fetchAllNotes, fetchAllChats, chats, addChat, noteprev, setnoteprev, note, prevNote}}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
