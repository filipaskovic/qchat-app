import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../_context/authContext";
import UserMessages from "./UserMessages";
import OthersMessages from "./OthersMessages";

const Messages = () => {
  const { currentUsers, currentUser } = useAuthContext();
  const [allMessages, setAllMessages] = useState([]);

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
          <UserMessages key={index} message={message} />
        ) : (
          <OthersMessages key={index} message={message} />
        )
      )}
    </div>
  );
};

export default Messages;
