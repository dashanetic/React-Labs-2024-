import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppSettings, PageType } from "../../types/appContext";

interface AppState {
  settings: AppSettings;
  currentPage: PageType;
}

const initialState: AppState = {
  settings: {
    theme: "light",
    language: "en",
  },
  currentPage: "home",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.settings.theme =
        state.settings.theme === "light" ? "dark" : "light";
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.settings.language = action.payload;
    },
    navigateTo: (state, action: PayloadAction<PageType>) => {
      state.currentPage = action.payload;
    },
    setAppSettings: (state, action: PayloadAction<AppSettings>) => {
      state.settings = action.payload;
    },
  },
});

export const { toggleTheme, setLanguage, navigateTo, setAppSettings } =
  appSlice.actions;

export default appSlice.reducer;
