import { createRoute } from "@tanstack/react-router";
import { profileRoutes } from "@shared/routes";
import { MainProfilePage } from "@pages/profile";
import { profileRootRoute } from "./route";
import { queryClient } from "@shared/libs";
import { profileQuery } from "@entities/user/profile";

export const profileMainRoute = createRoute({
  getParentRoute: () => profileRootRoute,
  path: profileRoutes.default,
  loader: async () => {
    await queryClient.prefetchQuery(profileQuery);
  },
  pendingComponent: () => <div>Loading profile...</div>,
  component: () => <MainProfilePage />,
});
