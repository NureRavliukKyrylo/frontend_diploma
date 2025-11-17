import { createRoute } from "@tanstack/react-router";
import { profileRoutes } from "@shared/routes/profile/profileRoutes";
import { profileRootRoute } from "../profileRoot";
import { getProfile } from "@entities/user/profile/api/profileApi";
import { queryClient } from "@shared/libs";
import { SettingsProfilePage } from "@pages/profile";

export const profileSettingsRoute = createRoute({
  getParentRoute: () => profileRootRoute,
  path: profileRoutes.settings.root,
  loader: async () => {
    await queryClient.prefetchQuery({
      queryKey: ["profile"],
      queryFn: getProfile,
      staleTime: 5 * 60 * 1000,
    });
  },
  pendingComponent: () => <div>Loading profile...</div>,
  component: () => <SettingsProfilePage />,
});
