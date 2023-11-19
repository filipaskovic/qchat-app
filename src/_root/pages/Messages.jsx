import React, { useRef } from "react";
import { useChatContext } from "../../_context/chatContext";
import UserMessage from "./UserMessage";
import OthersMessage from "./OthersMessage";
import MessagesInput from "./MessagesInput";

const Messages = () => {
  const { currentUser, addMessage, currentMessages } = useChatContext();

  const inputRef = useRef(null);

  return (
    <div
      style={{
        width: 700,
        height: "auto",
        backgroundColor: "gray",
        color: "white",
      }}>
      {currentMessages.map((message) =>
        message.username === currentUser.username ? (
          <UserMessage key={message.id} message={message} inputRef={inputRef} />
        ) : (
          <OthersMessage key={message.id} message={message} />
        )
      )}
      <MessagesInput inputRef={inputRef} />
    </div>
  );
};

export default Messages;
