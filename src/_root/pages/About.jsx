import React from "react";
import { useAuthContext } from "../../_context/authContext";
const About = () => {
  const { currentUser } = useAuthContext();

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
