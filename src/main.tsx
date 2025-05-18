import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "normalize.css";
import "./index.css";
import App from "./App";

function initializeApplication(): void {
  const rootElement = document.getElementById("root");

  if (!rootElement) {
    throw new Error("Root element not found");
  }

  const appRoot = createRoot(rootElement);

  appRoot.render(
    <StrictMode>
      <App />
    </StrictMode>
  );

  if (import.meta.env.DEV) {
    console.log("Application initialized in development mode");
  }
}

initializeApplication();