import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { loginUser, registerUser } from "../redux/slices/authThunks";
import { logout } from "../redux/slices/authSlice";
import { selectCurrentUser, selectAuthLoading } from "../redux/selectors";

interface AuthResult {
  success: boolean;
  error?: string;
}

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const loading = useAppSelector(selectAuthLoading);

  const login = useCallback(
    (email: string, password: string): AuthResult => {
      return dispatch(loginUser(email, password));
    },
    [dispatch]
  );

  const register = useCallback(
    (name: string, email: string, password: string): AuthResult => {
      return dispatch(registerUser(name, email, password));
    },
    [dispatch]
  );

  const logoutHandler = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return {
    currentUser,
    loading,
    login,
    register,
    logout: logoutHandler,
  };
};
