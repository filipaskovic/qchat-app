import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useChatContext } from "../../_context/chatContext";
import { useState } from "react";
import { initState } from "../../_constants/constants";

const SignInForm = () => {
  const { state, logUser, currentUsers } = useChatContext();
  if (currentUsers.length === 0) {
    return <Navigate to={"/sign-up"} />;
  }
  const [inputValues, setInputValues] = useState(initState);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    logUser(inputValues);
  };

  return (
    <>
      <form onSubmit={handleFormSubmit} noValidate>
        <input
          type='text'
          placeholder='enter your username'
          onChange={handleChange}
          name='username'
        />
        <input
          type='password'
          placeholder='enter your password'
          name='password'
          onChange={handleChange}
        />

        <button>Log in</button>
        <span>{state?.error?.logErr}</span>
      </form>
      <p>dont have an account</p>
      <Link to='/sign-up'>Sign up </Link>
    </>
  );
};

export default SignInForm;
