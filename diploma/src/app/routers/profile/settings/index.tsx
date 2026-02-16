import { createRoute } from "@tanstack/react-router";
import { profileRoutes } from "@shared/routes";
import { profileRootRoute } from "../route";
import { profileQuery } from "@entities/user/profile";
import { queryClient } from "@shared/libs";
import { SettingsProfilePage } from "@pages/profile";

export const profileSettingsRoute = createRoute({
  getParentRoute: () => profileRootRoute,
  path: profileRoutes.settings.root,
  loader: async () => {
    await queryClient.prefetchQuery(profileQuery);
  },
  pendingComponent: () => <div>Loading profile...</div>,
  component: () => <SettingsProfilePage />,
});
