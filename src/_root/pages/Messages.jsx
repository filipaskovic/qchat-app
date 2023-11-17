import React, { useEffect, useState, useRef } from "react";
import { useChatContext } from "../../_context/chatContext";
import UserMessage from "./UserMessage";
import OthersMessage from "./OthersMessage";

const Messages = () => {
  const { currentUser, addMessage, currentMessages, state } = useChatContext();
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

  return (
    <div
      style={{
        width: 700,
        height: "auto",
        backgroundColor: "gray",
        color: "white",
      }}>
      {currentMessages.map((message, index) =>
        message.username === currentUser.username ? (
          <UserMessage key={index} message={message} inputref={inputRef} />
        ) : (
          <OthersMessage key={index} message={message} />
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
