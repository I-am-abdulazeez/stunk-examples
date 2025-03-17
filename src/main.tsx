import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import Notifications from "./components/notification/notification.tsx";

import App from "./App.tsx";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <App />
      <Notifications />
    </StrictMode>
  </BrowserRouter>
);
