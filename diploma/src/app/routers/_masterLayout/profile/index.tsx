import { badgesQuery } from "@entities/badge/model/queries/badgesQuery";
import { skillsQuery } from "@entities/skill";
import { profileSearchSchema, profileSearchDefaults } from "@entities/user";
import { profileQuery } from "@entities/user/profile";
import { MainProfilePage } from "@pages/profile";
import { createFileRoute, stripSearchParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/profile/")({
  validateSearch: profileSearchSchema,
  search: {
    middlewares: [stripSearchParams(profileSearchDefaults)],
  },
  loaderDeps: ({ search }) => search,
  loader: async ({ context: { queryClient }, deps }) => {
    const { tab, ...skillsSearch } = deps;
    await queryClient.ensureQueryData(profileQuery.all());
    queryClient.prefetchQuery(skillsQuery.my(skillsSearch));
    queryClient.prefetchQuery(badgesQuery.my());
  },
  component: () => <MainProfilePage />,
});
