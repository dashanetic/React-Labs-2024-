import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "normalize.css";
import "./index.css";
import App from "./App";
import { store } from "./redux/store";
import { ThemeProvider } from "./theme-context";

function initializeApplication(): void {
  const rootElement = document.getElementById("root");

  if (!rootElement) {
    throw new Error("Root element not found");
  }

  const appRoot = createRoot(rootElement);

  appRoot.render(
    <StrictMode>
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    </StrictMode>
  );
}

initializeApplication();
