import React, { useEffect, useRef } from "react";
import { useChatContext } from "../../_context/chatContext";
import { useState } from "react";
const UserMessages = ({ message, inputref }) => {
  const { currentUser, editMessage } = useChatContext();
  const [editMode, setEditMode] = useState(false);
  const [editedMessage, setEditedMessage] = useState(message.text);
  const editInputRef = useRef(null);

  const handleEditMessage = () => {
    setEditMode(true);
  };
  const handleCancel = () => {
    setEditedMessage(message.text);
    setEditMode(false);
    inputref.current.focus();
  };
  const handleChange = (e) => {
    setEditedMessage(e.target.value);
  };
  const handleEdit = () => {
    editMessage({ text: editedMessage, id: message.id });
    setEditMode(false);
    inputref.current.focus();
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && editedMessage.trim() !== "") {
      handleEdit();
    }
  };
  useEffect(() => {
    editInputRef.current?.focus();
  }, [editMode]);
  if (editMode) {
    return (
      <div key={message.id} style={{ textAlign: "right" }}>
        <span>
          {message.username},{" "}
          <input
            type='text'
            value={editedMessage}
            onChange={handleChange}
            ref={editInputRef}
            onKeyDown={handleKeyPress}
          />{" "}
          {message.time.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
        <span>
          <button
            disabled={!editedMessage.trim() || editedMessage === message.text}
            onClick={handleEdit}>
            save
          </button>
          <button onClick={handleCancel}>cancel</button>
        </span>
      </div>
    );
  } else {
    return (
      <div key={message.id} style={{ textAlign: "right" }}>
        <span>
          {`${
            message.username
          }, ${editedMessage},  ${message.time.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}`}
          {message.edited && ", edited"}
        </span>

        <button onClick={handleEditMessage}>edit</button>
      </div>
    );
  }
};

export default UserMessages;
