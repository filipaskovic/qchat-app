import React, { useEffect, useState, useRef, useCallback } from "react";
import { useChatContext } from "../../_context/chatContext";

const UserMessage = ({ message: { text, id, edited, time }, inputRef }) => {
  const { editMessage } = useChatContext();
  const [editMode, setEditMode] = useState(false);
  const [editedMessage, setEditedMessage] = useState(text);
  const editInputRef = useRef(null);

  const handleEditMessage = useCallback(() => {
    setEditMode(true);
  }, []);

  const handleCancel = useCallback(() => {
    setEditedMessage(text);
    setEditMode(false);
    inputRef.current.focus();
  }, [text]);

  const handleChange = useCallback((e) => {
    setEditedMessage(e.target.value);
  }, []);

  const handleEdit = useCallback(() => {
    editMessage({ text: editedMessage, id });
    setEditMode(false);
    inputRef.current.focus();
  }, [editMessage, editedMessage, id]);

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter" && editedMessage.trim() !== "") {
        handleEdit();
      }
    },
    [handleEdit, editedMessage]
  );
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
