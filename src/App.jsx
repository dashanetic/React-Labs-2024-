import "./App.css";
import { createContext, useState } from "react";
import MenuPage from "./pages/MenuPage.jsx";

export const AppContext = createContext(null);

function App() {
  const [appSettings, setAppSettings] = useState({
    theme: "light",
    language: "en",
  });

  const toggleTheme = () => {
    setAppSettings((prev) => ({
      ...prev,
      theme: prev.theme === "light" ? "dark" : "light",
    }));
  };

  return (
    <AppContext.Provider
      value={{
        settings: appSettings,
        toggleTheme,
      }}
    >
      <div className={`App ${appSettings.theme}-theme`}>
        <MenuPage />
      </div>
    </AppContext.Provider>
  );
}

export default App;
