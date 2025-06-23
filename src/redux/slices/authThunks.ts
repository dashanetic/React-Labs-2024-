import { AppDispatch } from "../store";
import { loginSuccess } from "./authSlice";
import { User } from "./authSlice";

interface UserWithPassword extends User {
  password: string;
}

interface AuthResult {
  success: boolean;
  error?: string;
}

export const loginUser = (email: string, password: string) => {
  return (dispatch: AppDispatch): AuthResult => {
    const users: UserWithPassword[] = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      const userWithoutPassword: User = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      dispatch(loginSuccess(userWithoutPassword));
      return { success: true };
    } else {
      return {
        success: false,
        error: "Invalid email or password",
      };
    }
  };
};

export const registerUser = (name: string, email: string, password: string) => {
  return (dispatch: AppDispatch): AuthResult => {
    const users: UserWithPassword[] = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    if (users.some((user) => user.email === email)) {
      return {
        success: false,
        error: "User with this email already exists",
      };
    }

    const newUser: UserWithPassword = {
      id: Date.now().toString(),
      name,
      email,
      password,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    return dispatch(loginUser(email, password));
  };
};
