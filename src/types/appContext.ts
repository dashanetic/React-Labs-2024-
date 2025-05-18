import { User } from "../services/AuthContext";

export type PageType = "home" | "menu" | "login";

export interface AppSettings {
  theme: "light" | "dark";
  language: string;
}

export interface AppContextType {
  settings: AppSettings;
  toggleTheme: () => void;
  currentPage: PageType;
  navigateTo: (page: PageType) => void;
  currentUser: User | null;
  logout: () => void;
}
