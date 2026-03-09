import { projectQuery } from "@entities/project";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { Project, MapProjectSearchParams } from "@entities/project";

interface ProjectMarkersWidgetProps {
  search: MapProjectSearchParams;
  renderMarker: (project: Project) => React.ReactNode;
  onProjects: (projects: Project[]) => void;
}

export const ProjectMarkersWidget = ({
  search,
  renderMarker,
}: ProjectMarkersWidgetProps) => {
  const { data: projects } = useSuspenseQuery(projectQuery.map(search));
  return <div>{projects.data.map((project) => renderMarker(project))}</div>;
};
