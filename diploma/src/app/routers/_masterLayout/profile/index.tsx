import { profileQuery } from "@entities/user/profile";
import { MainProfilePage } from "@pages/profile";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/profile/")({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(profileQuery.all());
  },
  component: () => <MainProfilePage />,
});
