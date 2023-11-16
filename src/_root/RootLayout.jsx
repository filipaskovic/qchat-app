import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../_context/authContext";
const RootLayout = () => {
  const { currentUsers } = useAuthContext();
  if (currentUsers.length === 0) {
    return <Navigate to={"/Sign-up"} />;
  }
  if (currentUsers.every((user) => user.logged === false)) {
    return <Navigate to={"/Sign-in"} />;
  } else return <Outlet />;
};

export default RootLayout;
