import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";

import { useChatContext } from "../_context/chatContext";

const AuthLayout = () => {
  const { currentUsers } = useChatContext();

  return (
    <>
      {currentUsers.some((user) => user.logged === true) ? (
        <Navigate to='/' />
      ) : (
        <section>
          <Outlet />
        </section>
      )}
    </>
  );
};

export default AuthLayout;
