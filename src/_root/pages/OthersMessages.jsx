import React from "react";

const OthersMessages = ({ message }) => {
  return (
    <div key={message.id}>
      <span>
        {`${message.username}, ${message.text}`}
        {message.edited && ", edited"}
      </span>
    </div>
  );
};

export default OthersMessages;
