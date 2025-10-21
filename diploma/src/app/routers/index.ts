import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "./__root";
import {
  authRoute,
  authDefaultRoute,
  verificationRoute,
  setPasswordRoute,
  forgotPasswordRoute,
  forgotPasswordVerificationRoute,
} from "./auth";
import { indexRoute } from "./indexRoute";
import { fillingInfoRoute } from "./multiStepForm";
import { forgotPasswordDefaultRoute } from "./auth";

authRoute.addChildren({
  authDefaultRoute,
  verificationRoute,
  forgotPasswordRoute,
});

forgotPasswordRoute.addChildren({
  forgotPasswordDefaultRoute,
  forgotPasswordVerificationRoute,
  setPasswordRoute,
});

const routeTree = rootRoute.addChildren({
  authRoute,
  indexRoute,
  fillingInfoRoute,
});

export const router = createRouter({ routeTree });
