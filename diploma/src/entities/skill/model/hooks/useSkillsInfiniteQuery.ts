import { useInfiniteQuery } from "@tanstack/react-query";
import type { QueryResult } from "@shared/config/types";
import type { Skill } from "../types";
import { skillsQuery } from "../queries";
import type { SkillsInfiniteSearchParams } from "@entities/skill/libs";

export const useSkillsInfiniteQuery =
  (params: SkillsInfiniteSearchParams) => (): QueryResult<Skill> => {
    const {
      data = [],
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      isError,
    } = useInfiniteQuery(skillsQuery.infinite(params));

    return { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError };
  };
