import type { Project } from "./Project";

export interface ProjectsQueryResult {
  data: Project[] | undefined;
  isLoading?: boolean;
}
