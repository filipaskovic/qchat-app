import React, { useEffect, useState, useRef } from "react";
import { useChatContext } from "../../_context/chatContext";
import UserMessages from "./UserMessages";
import OthersMessages from "./OthersMessages";

const Messages = () => {
  const { currentUsers, currentUser, addMessage } = useChatContext();
  const [allMessages, setAllMessages] = useState([]);
  const [message, setMessage] = useState("");

  const inputRef = useRef(null);
  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleAddMessage = () => {
    addMessage(message);
    setMessage("");
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && message.trim() !== "") {
      handleAddMessage();
    }
  };
  useEffect(() => {
    inputRef.current.focus();
  }, [message]);

  useEffect(() => {
    function getMessages(user) {
      return user.messages.map((message) => ({
        id: message.id,
        username: user.username,
        text: message.text,
        time: new Date(message.time),
        edited: message.edited,
      }));
    }

    let messages = [];
    currentUsers.forEach((user) => {
      messages = messages.concat(getMessages(user));
    });

    messages.sort((a, b) => a.time - b.time);

    setAllMessages(messages);
  }, [currentUsers]);

  return (
    <div
      style={{
        width: 700,
        height: "auto",
        backgroundColor: "gray",
        color: "white",
      }}>
      {allMessages.map((message, index) =>
        message.username === currentUser.username ? (
          <UserMessages key={index} message={message} inputref={inputRef} />
        ) : (
          <OthersMessages key={index} message={message} />
        )
      )}
      <input
        type='text'
        placeholder='write message'
        name='text'
        onChange={handleChange}
        value={message}
        ref={inputRef}
        onKeyDown={handleKeyPress}
      />
      <button disabled={!message.trim()} onClick={handleAddMessage}>
        add
      </button>
    </div>
  );
};

export default Messages;
