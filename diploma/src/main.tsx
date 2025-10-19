import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import "./hero.css";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./app/routers";
import { ReactQueryProvider } from "./app/providers";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UIProvider } from "./app/providers";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <ReactQueryProvider>
        <UIProvider>
          <RouterProvider router={router} />
        </UIProvider>
      </ReactQueryProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
