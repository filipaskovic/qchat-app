import React from "react";

const OthersMessages = ({ message }) => {
  return (
    <div key={message.id}>
      <span>
        {`${message.username}, ${
          message.text
        },  ${message.time.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}`}
        {message.edited && ", edited"}
      </span>
    </div>
  );
};

export default OthersMessages;
