import React, { useState, useContext, useEffect, useRef } from "react";
import noteContext from "../context/notes/noteContext";
import ChatItem from "./ChatItem";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "../App.css";
function Chats(props) {
  const context = useContext(noteContext);
  const { chats, fetchAllChats, addChat } = context;
  const [chat, setChat] = useState({ msg: "" });
  const [loading, setLoading] = useState(false);
  const chatListRef = useRef(null);
  let history = useHistory();

  const handleAddChat = (event) => {
    event.preventDefault();
    addChat(chat.msg);
    setChat({ msg: "" });
  };

  const handleChange = (event) => {
    setChat({ ...chat, [event.target.name]: event.target.value });
  };

  const handleScroll = () => {
    const { scrollTop } = chatListRef.current;
    if (scrollTop === 0) {
      // User has scrolled to the top, fetch more chats
      fetchMoreChats();
    }
  };

  const fetchMoreChats = () => {
    // Implement logic to fetch more chats here
    // Set loading state while fetching
    setLoading(true);
    // Simulate loading for 1 second
    setTimeout(() => {
      // Fetch more chats
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchAllChats();
    } else {
      history.push("/");
    }
  }, [fetchAllChats, history]);

  useEffect(() => {
    // Add scroll event listener to chat list container
    chatListRef.current.addEventListener("scroll", handleScroll);
    // eslint-disable-next-line
  }, []);
  if (document.getElementById("navBar"))
    document.getElementById("navBar").style.background = `${
      window.innerWidth < 991
        ? "linear-gradient(to right, #833ab4 , #2720a1,#121120 )"
        : "transparent"
    }`;
  return (
    <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      <h3 style={{ padding: "4rem 0rem 1rem 1rem" }}>Community Chats: </h3>
      <div
        ref={chatListRef}
        className="list-group rounded-0"
        id="editchat"
      >
        {chats.slice().reverse().map((chat) => (
          <ChatItem key={chat._id} chat={chat} />
        ))}
        {loading && <div>Loading more chats...</div>}
      </div>
      <div className="texter">
        <form onSubmit={handleAddChat} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '0rem 0rem 0rem 0rem', alignItems: 'flex-start', height: '100%' }}>
          <input id="chatIn" name="msg" type="text" placeholder="type something" onChange={handleChange} value={chat.msg}/>
          <button id="chatBut" type="submit" className="btn btn-info">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chats;
