import React from "react";

const OthersMessage = ({ message: { text, id, username, edited, time } }) => {
  const messageTime = new Date(time);
  const hours = messageTime.getHours();
  const minutes = messageTime.getMinutes();

  return (
    <div key={id}>
      <span>
        {`${username}, ${text} `}

        {`${hours}:${minutes}  `}
        {edited && ", edited "}
      </span>
    </div>
  );
};

export default OthersMessage;
