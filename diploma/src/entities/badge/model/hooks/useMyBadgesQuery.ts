import { useSuspenseQuery } from "@tanstack/react-query";
import { badgesQuery } from "../queries/badgesQuery";
import type { Badge } from "../types";
import type { QueryResult } from "@shared/config/types";

export const useMyBadgesQuery = () => (): QueryResult<Badge> => {
  const { data } = useSuspenseQuery(badgesQuery.my());
  return { data: data.data };
};
