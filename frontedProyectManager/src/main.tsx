import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ConfirmProvider } from "./context/ConfirmProvider.tsx";
import { AlertProvider } from "./context/AlertProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfirmProvider>
      <AlertProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AlertProvider>
    </ConfirmProvider>
  </StrictMode>,
);
