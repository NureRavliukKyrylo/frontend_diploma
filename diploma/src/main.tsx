import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import "./test.css";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./app/routers";
import { ReactQueryProvider } from "./app/providers";
import { HeroUIProvider } from "@heroui/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactQueryProvider>
      <HeroUIProvider>
        <RouterProvider router={router} />
      </HeroUIProvider>
    </ReactQueryProvider>
  </StrictMode>
);
