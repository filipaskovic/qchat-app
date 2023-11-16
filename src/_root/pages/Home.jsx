import React from "react";
import { useAuthContext } from "../../_context/authContext";
import Messages from "./Messages";
import About from "./About";
const Home = () => {
  const { logout } = useAuthContext();

  const handleLogout = () => {
    logout();
  };
  return (
    <div>
      <About />
      <button onClick={handleLogout}>Logout</button>
      <Messages />
    </div>
  );
};

export default Home;
