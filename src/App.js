import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Notes from "./components/Notes";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Mynotes from "./components/Mynotes";
import NoteImgState from "./context/notes/NoteImgState";
import UserState from "./context/user/UserState";
import UserProfile from "./components/UserProfile";
import AddNote from "./components/AddNote";
import Chats from "./components/Chats";

function App() {
  const [alerter, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      typo: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };
  const Operation = (x) => {
    if (x === "delete") {
      showAlert("Note has been Deleted", "danger");
    } else if (x === "edit") {
      showAlert("Note has been Edited", "success");
    } else if (x === "add") {
      showAlert("Note Added Successfully", "success");
    }
  };

  return (
    <UserState>
      <NoteState>
        <NoteImgState>
          <Router>
            <Navbar />
            <Switch>
              <Route exact path="/">
                <Login alerter={alerter} toggle={Operation} />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/notes">
                <Notes alerter={alerter} toggle={Operation} />
              </Route>
              <Route exact path="/home">
                <Home toggle={Operation} alerter={alerter} />
              </Route>
              <Route exact path="/Signup">
                <Signup alerter={alerter} toggle={Operation} />
              </Route>
              <Route exact path="/mynotes">
                <Mynotes alerter={alerter} toggle={Operation} />
              </Route>
              <Route exact path="/profile">
                <UserProfile />
              </Route>
              <Route exact path="/addnote">
                <AddNote alerter={alerter} toggle={Operation} />
              </Route>
              <Route exact path="/chats">
                <Chats/>
              </Route>
            </Switch>
          </Router>
        </NoteImgState>
      </NoteState>
    </UserState>
  );
}

export default App;
