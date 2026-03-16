import { profileSearchSchema, profileSearchDefaults } from "@entities/user";
import { profileQuery } from "@entities/user/profile";
import { MainProfilePage } from "@pages/profile";
import { createFileRoute, stripSearchParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/profile/")({
  validateSearch: profileSearchSchema,
  search: {
    middlewares: [stripSearchParams(profileSearchDefaults)],
  },
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(profileQuery.all());
  },
  component: () => <MainProfilePage />,
});
