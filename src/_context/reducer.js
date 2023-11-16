import {
  ADD_USER,
  LOGIN,
  LOGOUT,
  ADD_MESSAGE,
  EDIT_MESSAGE,
} from "../_constants/constants";
import validateUser from "./validateUser";

export let currentUsers = JSON.parse(localStorage.getItem("users")) || [];

const userExist = (currentUsers, action) => {
  return currentUsers?.find(
    (user) =>
      user.username === action.username && user.password === action.password
  );
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ADD_USER:
      const validationResult = validateUser(action.payload);
      if (validationResult) {
        return { ...state, error: validationResult };
      } else {
        const newUser = { ...action.payload, error: null, logged: true };
        const updatedUsers = [...currentUsers, newUser];
        currentUsers = updatedUsers;
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        return updatedUsers;
      }

    case LOGIN:
      if (userExist(currentUsers, action.payload)) {
        const updatedUsers = currentUsers.map((user) =>
          user.username === action.payload.username
            ? { ...user, logged: true }
            : user
        );
        currentUsers = updatedUsers;
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        return updatedUsers;
      } else {
        return {
          ...state,
          error: { logErr: "wrong username or password" },
        };
      }
    case LOGOUT:
      const updateUsersLoginStatus = currentUsers.map((user) => ({
        ...user,
        logged: false,
      }));
      currentUsers = updateUsersLoginStatus;
      localStorage.setItem("users", JSON.stringify(updateUsersLoginStatus));
      return updateUsersLoginStatus;
    case ADD_MESSAGE:
      const currentUser = currentUsers.find((user) => user.logged === true);
      const newMessage = {
        text: action.payload,
        time: new Date(),
        edited: false,
        id: crypto.randomUUID(),
      };
      const updatedMessages = [...currentUser.messages, newMessage];

      const updatedUser = { ...currentUser, messages: updatedMessages };

      if (currentUsers.length === 1) {
        console.log(updatedUser);
        currentUsers = [updatedUser];
        localStorage.setItem("users", JSON.stringify(currentUsers));
      } else {
        const updatedUsers = currentUsers.map((user) => {
          return user.username === currentUser.username ? updatedUser : user;
        });
        currentUsers = updatedUsers;
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        console.log(updatedUsers);
      }
      return currentUsers;
    case EDIT_MESSAGE:
      const userForEditing = currentUsers.find((user) => user.logged === true);

      const updatedUserMessages = userForEditing.messages.map((message) => {
        if (action.payload.id === message.id) {
          return { ...message, text: action.payload.text, edited: true };
        }
        return message;
      });

      const updatedEditedUser = {
        ...userForEditing,
        messages: updatedUserMessages,
      };

      const updatedUsers = currentUsers.map((user) => {
        if (user.username === userForEditing.username) {
          return updatedEditedUser;
        }
        return user;
      });
      currentUsers = updatedUsers;
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      return updatedUsers;
    default:
      return state;
  }
};
