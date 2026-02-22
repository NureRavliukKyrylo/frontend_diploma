import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import "./hero.css";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { ReactQueryProvider } from "./app/providers";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UIProvider } from "./app/providers";
import { routeTree } from "@app/routeTree.gen";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <ReactQueryProvider>
        <UIProvider>
          <RouterProvider router={router} />
        </UIProvider>
      </ReactQueryProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
);
