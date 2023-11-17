import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useChatContext } from "../_context/chatContext";
const RootLayout = () => {
  const { currentUsers } = useChatContext();
  if (currentUsers.length === 0) {
    return <Navigate to={"/Sign-up"} />;
  } else if (currentUsers.every((user) => user.logged === false)) {
    return <Navigate to={"/Sign-in"} />;
  } else return <Outlet />;
};

export default RootLayout;
