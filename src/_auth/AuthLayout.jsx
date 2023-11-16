import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";

import { useAuthContext } from "../_context/authContext";

const AuthLayout = () => {
  const { currentUsers } = useAuthContext();

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
