import type { ProjectsResponse } from "@entities/project/api";

export interface ProjectsQueryResult {
  data: ProjectsResponse | undefined;
  isLoading?: boolean;
}
