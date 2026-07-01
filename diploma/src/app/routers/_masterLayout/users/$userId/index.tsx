import { createFileRoute } from "@tanstack/react-router";
import { profileQuery } from "@entities/user/profile";
import {
  PublicUserProfilePage,
  publicProfileSearchSchema,
} from "@pages/users";

export const Route = createFileRoute("/_masterLayout/users/$userId/")({
  validateSearch: publicProfileSearchSchema,
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(profileQuery.publicById(params.userId));
  },
  component: PublicUserProfilePage,
});
