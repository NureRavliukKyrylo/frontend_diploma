import { createRoute } from "@tanstack/react-router";
import { profileRoutes } from "@shared/routes";
import { MainProfilePage } from "@pages/profile";
import { profileRootRoute } from "./route";

export const profileMainRoute = createRoute({
  getParentRoute: () => profileRootRoute,
  path: profileRoutes.default,
  component: () => <MainProfilePage />,
});
