import React, { useState } from "react";
import { useAuthContext } from "../../_context/authContext";
import Messages from "./Messages";
import About from "./About";
const Home = () => {
  const { logout, addMessage } = useAuthContext();
  const [message, setMessage] = useState("");
  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  const handleLogout = () => {
    logout();
  };
  const handleAddMessage = () => {
    addMessage(message);
  };

  return (
    <div>
      <About />
      <button onClick={handleLogout}>Logout</button>
      <Messages />

      <input
        type='text'
        placeholder='write message'
        name='text'
        onChange={handleChange}
        value={message}
      />
      <button disabled={!message.trim()} onClick={handleAddMessage}>
        add
      </button>
    </div>
  );
};

export default Home;
