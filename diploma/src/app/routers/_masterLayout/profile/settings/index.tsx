import {
  profileSettingsSearchDefaults,
  profileSettingsSearchSchema,
} from "@entities/user";
import { profileQuery } from "@entities/user/profile";
import { createFileRoute, stripSearchParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/profile/settings/")({
  validateSearch: profileSettingsSearchSchema,
  search: {
    middlewares: [stripSearchParams(profileSettingsSearchDefaults)],
  },
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(profileQuery.all());
  },
});
