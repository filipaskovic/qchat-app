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

const updateLocalStorage = (users) => {
  currentUsers = users;
  localStorage.setItem("users", JSON.stringify(users));
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ADD_USER:
      const validationResult = validateUser(action.payload);
      if (validationResult) {
        return { ...state, error: validationResult };
      }

      const newUser = { ...action.payload, error: null, logged: true };
      const updatedUsers = [...currentUsers, newUser];
      updateLocalStorage(updatedUsers);
      return currentUsers;

    case LOGIN:
      if (userExist(currentUsers, action.payload)) {
        const updatedUsers = currentUsers.map((user) =>
          user.username === action.payload.username
            ? { ...user, logged: true }
            : user
        );
        updateLocalStorage(updatedUsers);
        return currentUsers;
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
      updateLocalStorage(updateUsersLoginStatus);
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
        updateLocalStorage([updatedUser]);
      } else {
        const updatedUsersForAddMessage = currentUsers.map((user) =>
          user.username === currentUser.username ? updatedUser : user
        );
        updateLocalStorage(updatedUsersForAddMessage);
      }
      return currentUsers;

    case EDIT_MESSAGE:
      const userForEditing = currentUsers.find((user) => user.logged === true);
      const updatedUserMessages = userForEditing.messages.map((message) =>
        action.payload.id === message.id
          ? { ...message, text: action.payload.text, edited: true }
          : message
      );

      const updatedEditedUser = {
        ...userForEditing,
        messages: updatedUserMessages,
      };

      const updatedUsersForEditMessage = currentUsers.map((user) =>
        user.username === userForEditing.username ? updatedEditedUser : user
      );
      updateLocalStorage(updatedUsersForEditMessage);
      return currentUsers;

    default:
      return state;
  }
};
