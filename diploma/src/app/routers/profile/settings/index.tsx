import { createRoute } from "@tanstack/react-router";
import { profileRoutes } from "@shared/routes/profile/profileRoutes";
import { ProfileSettingsWidget } from "@widgets/profile";
import { profileRoute } from "..";
import { getProfile } from "@entities/user/profile/api/profileApi";
import { queryClient } from "@shared/libs";

export const profileSettingsRoute = createRoute({
  getParentRoute: () => profileRoute,
  path: profileRoutes.settings.root,
  loader: async () => {
    await queryClient.prefetchQuery({
      queryKey: ["profile"],
      queryFn: getProfile,
      staleTime: 5 * 60 * 1000,
    });
  },
  pendingComponent: () => <div>Loading profile...</div>,
  component: () => <ProfileSettingsWidget />,
});
