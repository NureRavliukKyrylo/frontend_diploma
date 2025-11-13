import { createRoute } from "@tanstack/react-router";
import { indexLayoutRoute } from "./indexLayoutRoute";
import { SettingsMainForm } from "@features/profile";

export const indexRoute = createRoute({
  getParentRoute: () => indexLayoutRoute,
  path: "/",
  component: () => <SettingsMainForm />,
});
