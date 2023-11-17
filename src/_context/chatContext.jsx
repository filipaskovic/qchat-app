import React, { createContext, useContext, useReducer } from "react";
import {
  ADD_USER,
  LOGIN,
  LOGOUT,
  ADD_MESSAGE,
  EDIT_MESSAGE,
  initState,
} from "../_constants/constants";
import { reducer, currentUsers } from "./reducer";

const ChatContext = createContext();

export const useChatContext = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);
  const addUser = (user) => {
    dispatch({ type: ADD_USER, payload: user });
  };
  const logUser = (logData) => {
    dispatch({ type: LOGIN, payload: logData });
  };
  const logout = () => {
    dispatch({ type: LOGOUT });
  };
  const addMessage = (message) => {
    dispatch({ type: ADD_MESSAGE, payload: message });
  };
  const editMessage = (editedMessage) => {
    dispatch({ type: EDIT_MESSAGE, payload: editedMessage });
  };
  const currentUser = currentUsers.find((user) => user.logged === true) || null;

  return (
    <ChatContext.Provider
      value={{
        currentUser,
        state,
        addUser,
        logUser,
        logout,
        addMessage,
        editMessage,
        currentUsers,
        initState,
      }}>
      {children}
    </ChatContext.Provider>
  );
};
