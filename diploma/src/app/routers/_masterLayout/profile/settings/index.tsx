import { profileQuery } from "@entities/user/profile";
import { SettingsProfilePage } from "@pages/profile";
import { queryClient } from "@shared/libs";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/profile/settings/")({
  loader: async () => {
    await queryClient.prefetchQuery(profileQuery);
  },
  pendingComponent: () => <div>Loading profile...</div>,
  component: () => <SettingsProfilePage />,
});
