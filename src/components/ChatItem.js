import React from "react";
import "./note.css";
const ChatItem = (props) => {
  const { chat } = props;
  const chatTime = new Date(chat.time).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  return (
    <div className="card rounded-0" id="ntitem2">
      <div
        className="card-body"
      >
        <div className="header" style={{display:'flex',justifyContent:'space-between'}}>
        <h5 className="card-title">
          {chat.username}
        </h5>
        <p className="card-text">
          {chatTime}
        </p>
        </div>
        
        <p className="card-text">
          {chat.msg}
        </p>
        
      </div>
    </div>
  );
};

export default ChatItem;
