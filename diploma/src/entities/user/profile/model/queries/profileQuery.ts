import { queryOptions } from "@tanstack/react-query";
import { getProfile } from "../../api/profileApi";

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
