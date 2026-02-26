import { profileQuery } from "@entities/user/profile";
import { SettingsProfilePage } from "@pages/profile";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/profile/settings/")({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(profileQuery.all());
  },
  component: () => <SettingsProfilePage />,
});
