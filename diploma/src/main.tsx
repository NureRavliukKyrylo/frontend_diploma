import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import "./hero.css";
import { AppRouterProvider, ReactQueryProvider } from "./app/providers";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UIProvider } from "./app/providers";

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <ReactQueryProvider>
      <UIProvider>
        <AppRouterProvider />
      </UIProvider>
    </ReactQueryProvider>
  </GoogleOAuthProvider>,
);
