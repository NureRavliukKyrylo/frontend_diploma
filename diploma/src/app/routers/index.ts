import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "./__root";
import {
  authRoute,
  authDefaultRoute,
  verificationEmailRoute,
  setPasswordRoute,
  forgotPasswordRoute,
  forgotPasswordVerificationRoute,
  verificationTwoFactorRoute,
} from "./auth";
import { indexRoute } from "./indexRoute";
import { fillingInfoRoute } from "./multiStepForm";
import { forgotPasswordDefaultRoute } from "./auth";

authRoute.addChildren({
  authDefaultRoute,
  verificationEmailRoute,
  forgotPasswordRoute,
  verificationTwoFactorRoute,
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
