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
import { indexLayoutRoute } from "./indexLayoutRoute";
import { profileRoute } from "./profile";
import { profileSettingsRoute } from "./profile/settings";

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

indexLayoutRoute.addChildren({ indexRoute, profileRoute });

profileRoute.addChildren({
  profileSettingsRoute,
});

const routeTree = rootRoute.addChildren({
  authRoute,
  indexLayoutRoute,
  fillingInfoRoute,
});

export const router = createRouter({ routeTree });
