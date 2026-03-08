import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import "./hero.css";
import { AppRouterProvider, ReactQueryProvider } from "./app/providers";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UIProvider } from "./app/providers";
import { APIProvider } from "@vis.gl/react-google-maps";

createRoot(document.getElementById("root")!).render(
  <APIProvider apiKey={"AIzaSyAjBQwS4b83svsyaCJi3_ZOX0o0ct7dPj0"}>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <ReactQueryProvider>
        <UIProvider>
          <AppRouterProvider />
        </UIProvider>
      </ReactQueryProvider>
    </GoogleOAuthProvider>
  </APIProvider>,
);
