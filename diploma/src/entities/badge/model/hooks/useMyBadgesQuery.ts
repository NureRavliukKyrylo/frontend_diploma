import { useSuspenseQuery } from "@tanstack/react-query";
import type { BadgesQueryResult } from "../types/BadgesQueryResult";
import { badgesQuery } from "../queries/badgesQuery";

export const useMyBadgesQuery = () => (): BadgesQueryResult => {
  const { data } = useSuspenseQuery(badgesQuery.my());
  return { data: data.data };
};
