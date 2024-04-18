import React, { useState, useContext, useEffect, useRef } from "react";
import noteContext from "../context/notes/noteContext";
import ChatItem from "./ChatItem";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "../App.css";
import Spinner from "./Spinner";
function Chats(props) {
  const context = useContext(noteContext);
  const { chats, fetchAllChats, addChat } = context;
  const [chat, setChat] = useState({ msg: "" });
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const chatListRef = useRef(null);
  let history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchAllChats();
      setLoading(true); // Set loading to true initially
    } else {
      history.push("/");
    }
  }, [fetchAllChats, history]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        chatListRef.current &&
        chatListRef.current.scrollTop ===
          chatListRef.current.scrollHeight - chatListRef.current.clientHeight &&
        hasMore // Check if more chats are available
      ) {
        // User has scrolled to the bottom
        fetchMoreChats();
      }
    };

    chatListRef.current.addEventListener("scroll", handleScroll);

    return () => {
      chatListRef.current.removeEventListener("scroll", handleScroll);
    };
  }, [fetchAllChats, hasMore]);

  const fetchMoreChats = async () => {
    setLoading(true); // Set loading to true when fetching more chats
    await fetchAllChats(); // Fetch more chats
    setLoading(false); // Set loading to false after chats are fetched
  };

  const handleAddChat = (event) => {
    event.preventDefault();
    addChat(chat.msg);
    setChat({ msg: "" });
  };

  const handleChange = (event) => {
    setChat({ ...chat, [event.target.name]: event.target.value });
  };

  return (
    <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      {loading && <Spinner />}
      <h3 style={{ padding: "4rem 0rem 1rem 1rem" }}>Community Chats: </h3>
      <div ref={chatListRef} className="list-group rounded-0" id="editchat">
        {chats
          .slice()
          .reverse()
          .map((chat) => (
            <ChatItem key={chat._id} chat={chat} />
          ))}
        {loading && <div>Loading more chats...</div>}
      </div>
      <div className="texter">
        <form
          onSubmit={handleAddChat}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            padding: "0rem 0rem 0rem 0rem",
            alignItems: "flex-start",
            height: "100%",
          }}
        >
          <input
            id="chatIn"
            name="msg"
            type="text"
            placeholder="type something"
            onChange={handleChange}
            value={chat.msg}
          />
          <button id="chatBut" type="submit" className="btn btn-info">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chats;
