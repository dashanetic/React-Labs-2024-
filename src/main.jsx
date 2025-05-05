import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "normalize.css";
import "./index.css";
import FoodDeliveryApplication from "./App.jsx";

function initializeApplication() {
  const rootElement = document.getElementById("root");

  const appRoot = createRoot(rootElement);

  appRoot.render(
    <StrictMode>
      <FoodDeliveryApplication />
    </StrictMode>
  );

  if (import.meta.env.DEV) {
    console.log("Application initialized in development mode");
  }
}

initializeApplication();
