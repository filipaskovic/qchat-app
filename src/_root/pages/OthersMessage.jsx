import React from "react";

const OthersMessage = ({ message }) => {
  return (
    <div key={message.id}>
      <span>
        {`${message.username}, ${message.text} `}
        {message.edited && ", edited "}
        {`${new Date(message.time).getHours()}:${new Date(
          message.time
        ).getMinutes()}  `}
      </span>
    </div>
  );
};

export default OthersMessage;
