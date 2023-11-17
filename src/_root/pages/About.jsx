import React from "react";
import { useChatContext } from "../../_context/chatContext";
const About = () => {
  const { currentUser } = useChatContext();

  return (
    <div>
      <p>Welcome{currentUser.username}</p>
      <p>About you:</p>
      <p>first name:{currentUser.firstName}</p>
      <p>last Name:{currentUser.lastName}</p>
      <p>email : {currentUser.email}</p>
    </div>
  );
};

export default About;
