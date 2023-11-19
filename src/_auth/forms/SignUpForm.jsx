import React from "react";
import { Link } from "react-router-dom";
import { useChatContext } from "../../_context/chatContext";
import { initState } from "../../_constants/constants";
import { useState } from "react";

const SignUpForm = () => {
  const { state, addUser } = useChatContext();
  const [inputValues, setInputValues] = useState(initState);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addUser(inputValues);
  };
  return (
    <div className='container'>
      <form onSubmit={handleFormSubmit} noValidate>
        <input
          type='text'
          placeholder='enter your username'
          onChange={handleChange}
          name='username'
        />
        {state.error?.username && <span>{state.error?.username}</span>}

        <input
          type='text'
          placeholder='enter your first name'
          name='firstName'
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='enter your last name'
          name='lastName'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='enter your email'
          name='email'
          onChange={handleChange}
        />
        {state.error?.email && <span>{state.error?.email}</span>}

        <input
          type='password'
          placeholder='enter your password'
          name='password'
          onChange={handleChange}
        />
        {state.error?.password && <span>{state.error?.password}</span>}
        <button>Sign Up</button>
        {state.error?.general && <span>{state.error?.general}</span>}
        <p>already have an account</p>
        <Link to='/sign-in'>Log in </Link>
      </form>
    </div>
  );
};

export default SignUpForm;
