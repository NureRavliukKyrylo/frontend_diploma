import { profileQuery } from "@entities/user/profile";
import { MainProfilePage } from "@pages/profile";
import { queryClient } from "@shared/libs";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/profile/")({
  loader: async () => {
    await queryClient.prefetchQuery(profileQuery);
  },
  pendingComponent: () => <div>Loading profile...</div>,
  component: () => <MainProfilePage />,
});
