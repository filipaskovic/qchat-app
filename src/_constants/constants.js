export const ADD_USER = "ADD_USER";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const ADD_MESSAGE = "ADD_MESSAGE";
export const EDIT_MESSAGE = "EDIT_MESSAGE";
export const GET_MESSAGES = "GET_MESSAGES";
export const initState = {
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  logged: false,
  error: null,
  messages: [],
};
