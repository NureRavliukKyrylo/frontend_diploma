import { getMyBadges } from "@entities/badge/api";
import { queryOptions } from "@tanstack/react-query";

export const badgesKeys = {
  all: () => ["badges"] as const,
  my: () => [...badgesKeys.all(), "my"],
};

export const badgesQuery = {
  my: () =>
    queryOptions({
      queryKey: badgesKeys.my(),
      queryFn: () => getMyBadges(),
    }),
};
