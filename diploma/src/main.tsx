import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import "./hero.css";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { ReactQueryProvider } from "./app/providers";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UIProvider } from "./app/providers";
import { routeTree } from "@app/routeTree.gen";
import { BaseSpinner } from "@shared/ui";

const router = createRouter({
  routeTree,
  defaultPendingMs: 0,
  defaultPreload: "intent",
  defaultPreloadDelay: 300,
  defaultPendingComponent: () => (
    <div className="flex justify-center items-center w-full h-full min-h-screen">
      <BaseSpinner
        classNames={{
          svg: "w-5 h-5 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-18 lg:h-18 text-purple-400",
        }}
      />
    </div>
  ),
  defaultErrorComponent: ({ error }) => (
    <div className="flex flex-col justify-center items-center w-full min-h-screen gap-4">
      <p className="text-red-500">Something went wrong</p>
      <p className="text-sm text-gray-400">{error.message}</p>
    </div>
  ), //temporary
});

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
