import { useInfiniteQuery } from "@tanstack/react-query";
import { projectQuery } from "../queries";
import type { QueryResult } from "@shared/config/types";
import type { Project } from "../types";
import type { ProjectPaginationParams } from "../../libs";

export const useProjectsInfiniteQuery =
  (params: ProjectPaginationParams) => (): QueryResult<Project> => {
    const {
      data = [],
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      isError,
    } = useInfiniteQuery(projectQuery.infinite(params));

    return { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError };
  };
