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
import { profileMainRoute, profileRootRoute } from "./profile";
import { profileSettingsRoute } from "./profile/settings";
import { projectsRootRoute } from "./projects/route";
import { projectsMainRoute } from "./projects";
import { categoriesRootRoute } from "./categories/route";
import { categoriesMainRoute } from "./categories";
import { categoryDetailRoute } from "./categories/$name";

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

profileRootRoute.addChildren({
  profileSettingsRoute,
  profileMainRoute,
});

projectsRootRoute.addChildren({
  projectsMainRoute,
});

categoriesRootRoute.addChildren({
  categoriesMainRoute,
  categoryDetailRoute,
});

indexLayoutRoute.addChildren({
  indexRoute,
  profileRootRoute,
  projectsRootRoute,
  categoriesRootRoute,
});

const routeTree = rootRoute.addChildren({
  authRoute,
  indexLayoutRoute,
  fillingInfoRoute,
});

export const router = createRouter({ routeTree });
