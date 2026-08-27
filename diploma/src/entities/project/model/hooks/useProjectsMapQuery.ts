import { projectQuery } from "../queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { Project } from "../types";
import type { QueryResult } from "@shared/config/types";
import { type MapProjectRequestParams } from "../../libs";

export const useProjectsMapQuery =
  (search: MapProjectRequestParams) => (): QueryResult<Project> => {
    const { data } = useSuspenseQuery(projectQuery.map(search));
    return { data: data.data };
  };
