import React from "react";
import { useChatContext } from "../../_context/chatContext";
import Messages from "./Messages";
import About from "./About";
const Home = () => {
  const { logout } = useChatContext();

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
