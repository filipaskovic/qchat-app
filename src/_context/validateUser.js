export default function validateUser(user) {
  const errors = {};

  if (Object.values(user).some((value) => value === "")) {
    errors.general = "All fields must be fulfilled";
  }

  if (user.username?.trim().length < 3 || user.username?.trim().length > 15) {
    errors.username = "Username must be between 3 and 15 characters";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!user.email?.match(emailRegex)) {
    errors.email = "Email must be valid";
  }

  if (user.password?.trim().length < 3 || user.password?.trim().length > 15) {
    errors.password = "Password must be between 3 and 15 characters";
  }

  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  if (existingUsers.length > 0) {
    const emailExists = existingUsers.some(
      (exUser) => exUser.email === user.email
    );
    if (emailExists) {
      errors.email = "User with this email already exists";
    }

    const usernameExists = existingUsers.some(
      (exUser) => exUser.username === user.username
    );
    if (usernameExists) {
      errors.username = "User with this username already exists";
    }
  }

  return Object.keys(errors).length === 0 ? null : errors;
}
