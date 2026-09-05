import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./app.css";
import App from "./App.tsx";
import { ErrorBoundary } from "./app/ErrorBoundary.tsx";
import { restoreGithubPagesRoute } from "./app/studentRouting.ts";

restoreGithubPagesRoute(window.location, window.history, import.meta.env.BASE_URL);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
