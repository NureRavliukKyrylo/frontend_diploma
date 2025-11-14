import { createRoute } from "@tanstack/react-router";
import { indexLayoutRoute } from "./indexLayoutRoute";
import { ProfileSettingsWidget } from "@widgets/profile";

export const indexRoute = createRoute({
  getParentRoute: () => indexLayoutRoute,
  path: "/",
  component: () => <ProfileSettingsWidget />,
});
