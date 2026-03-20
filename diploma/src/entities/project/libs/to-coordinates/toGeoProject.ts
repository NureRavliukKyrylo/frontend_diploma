import type { Project } from "../../model/types/Project";

export const toGeoPoints = (projects: Project[]) =>
  projects.flatMap((project) => {
    const lat = project.location?.latitude;
    const lng = project.location?.longitude;
    if (!lat || !lng) return [];

    return [
      {
        type: "Feature" as const,
        properties: { cluster: false, project },
        geometry: {
          type: "Point" as const,
          coordinates: [lng, lat],
        },
      },
    ];
  });
