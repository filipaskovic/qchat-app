import React from "react";

const OthersMessage = ({ message: { text, id, username, edited, time } }) => {
  console.log();
  return (
    <div key={id}>
      <span>
        {`${username}, ${text} `}
        {edited && ", edited "}
        {`${new Date(time).getHours()}:${new Date(time).getMinutes()}  `}
      </span>
    </div>
  );
};

export default OthersMessage;
