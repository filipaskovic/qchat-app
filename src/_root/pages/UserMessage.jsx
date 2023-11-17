import React, { useEffect, useRef } from "react";
import { useChatContext } from "../../_context/chatContext";
import { useState } from "react";
const UserMessage = ({ message: { text, id, edited, time }, inputref }) => {
  const { editMessage } = useChatContext();
  const [editMode, setEditMode] = useState(false);
  const [editedMessage, setEditedMessage] = useState(text);
  const editInputRef = useRef(null);

  const handleEditMessage = () => {
    setEditMode(true);
  };
  const handleCancel = () => {
    setEditedMessage(text);
    setEditMode(false);
    inputref.current.focus();
  };
  const handleChange = (e) => {
    setEditedMessage(e.target.value);
  };
  const handleEdit = () => {
    editMessage({ text: editedMessage, id });
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
      <div key={id} style={{ textAlign: "right" }}>
        <span>
          <input
            type='text'
            value={editedMessage}
            onChange={handleChange}
            ref={editInputRef}
            onKeyDown={handleKeyPress}
          />
        </span>
        <span>
          <button
            disabled={!editedMessage.trim() || editedMessage === text}
            onClick={handleEdit}>
            save
          </button>
          <button onClick={handleCancel}>cancel</button>
        </span>
      </div>
    );
  } else {
    return (
      <div key={id} style={{ textAlign: "right" }}>
        {edited && " edited "}
        {`${new Date(time).getHours()}:${new Date(time).getMinutes()}  `}
        <span>{editedMessage}, Me</span>

        <button onClick={handleEditMessage}>edit</button>
      </div>
    );
  }
};

export default UserMessage;
