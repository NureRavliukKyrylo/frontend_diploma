import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import "./test.css";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./app/routers";
import { ReactQueryProvider } from "./app/providers";
import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <ReactQueryProvider>
        <HeroUIProvider>
          <ToastProvider
            placement="top-right"
            maxVisibleToasts={3}
            toastOffset={10}
            toastProps={{
              variant: "flat",
              radius: "md",
              hideIcon: false,
            }}
          />
          <RouterProvider router={router} />
        </HeroUIProvider>
      </ReactQueryProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
