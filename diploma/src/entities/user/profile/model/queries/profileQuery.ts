import { queryOptions } from "@tanstack/react-query";
import { getProfile } from "../../api";

export const profileKeys = {
  all: () => ["profile"] as const,
};

export const profileQuery = {
  all: () =>
    queryOptions({
      queryKey: profileKeys.all(),
      queryFn: getProfile,
    }),
};
