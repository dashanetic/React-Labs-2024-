import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  currentUser: User | null;
  loading: boolean;
}

const initialState: AuthState = {
  currentUser: null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
    initializeAuth: (state) => {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        state.currentUser = JSON.parse(storedUser);
      }
      state.loading = false;
    },
  },
});

export const {
  setLoading,
  setCurrentUser,
  loginSuccess,
  logout,
  initializeAuth,
} = authSlice.actions;

export default authSlice.reducer;
