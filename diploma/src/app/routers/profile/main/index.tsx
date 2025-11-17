import { createRoute } from "@tanstack/react-router";
import { profileRoutes } from "@shared/routes/profile/profileRoutes";
import { MainProfilePage } from "@pages/profile";
import { profileRootRoute } from "../profileRoot";

export const profileMainRoute = createRoute({
  getParentRoute: () => profileRootRoute,
  path: profileRoutes.default,
  component: () => <MainProfilePage />,
});
