import React from "react";
import { useChatContext } from "../../_context/chatContext";
const About = () => {
  const { currentUser, logout } = useChatContext();
  const { username, firstName, lastName, email } = currentUser;

  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <p>Welcome{username}</p>
      <p>About you:</p>
      <p>first name:{firstName}</p>
      <p>last Name:{lastName}</p>
      <p>email : {email}</p>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default About;
