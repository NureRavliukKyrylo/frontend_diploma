import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "./__root";
import {
  authRoute,
  authDefaultRoute,
  verificationRoute,
  setPasswordRoute,
} from "./auth";
import { indexRoute } from "./indexRoute";
import { fillingInfoRoute } from "./multiStepForm";

authRoute.addChildren({
  authDefaultRoute,
  verificationRoute,
  setPasswordRoute,
});

const routeTree = rootRoute.addChildren({
  authRoute,
  indexRoute,
  fillingInfoRoute,
});

export const router = createRouter({ routeTree });
