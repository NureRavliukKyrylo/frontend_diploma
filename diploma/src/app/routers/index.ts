import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "./__root";
import { authRoute } from "./auth";
import { authDefaultRoute } from "./auth/auth";
import { indexRoute } from "./indexRoute";
import { verificationRoute } from "./auth/verification";
import { setPasswordRoute } from "./auth/setPassword";

authRoute.addChildren({
  authDefaultRoute,
  verificationRoute,
  setPasswordRoute,
});

const routeTree = rootRoute.addChildren({
  authRoute,
  indexRoute,
});

export const router = createRouter({ routeTree });
