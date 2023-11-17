import React from "react";
import { useChatContext } from "../../_context/chatContext";
const About = () => {
  const {
    currentUser: { username, firstName, lastName, email },
  } = useChatContext();

  return (
    <>
      <p>Welcome{username}</p>
      <p>About you:</p>
      <p>first name:{firstName}</p>
      <p>last Name:{lastName}</p>
      <p>email : {email}</p>
    </>
  );
};

export default About;
