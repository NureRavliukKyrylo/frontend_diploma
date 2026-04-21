import type { MyProjectsRequestParams } from "@entities/project/libs";
import { projectQuery } from "../queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { QueryResult } from "@shared/config/types";
import type { Project } from "../types";

export const useMyProjectsListQuery =
  (search: MyProjectsRequestParams) => (): QueryResult<Project> => {
    const { data } = useSuspenseQuery(projectQuery.my(search));
    return { data: data.data };
  };
