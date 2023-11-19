import React, { useEffect, useState, useRef } from "react";
import { useChatContext } from "../../_context/chatContext";
const MessagesInput = ({ inputRef }) => {
  const { addMessage } = useChatContext();
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleAddMessage = () => {
    addMessage(message);
    setMessage("");
    inputRef.current.focus();
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && message.trim() !== "") {
      handleAddMessage();
    }
  };
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <>
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
    </>
  );
};

export default MessagesInput;
