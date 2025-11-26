import { createRoute } from "@tanstack/react-router";
import { projectsRootRoute } from "./route";
import { ProjectsListWidget } from "@widgets/projects";
import { Pagination } from "@shared/ui";
import { useState } from "react";

export const projectsMainRoute = createRoute({
  getParentRoute: () => projectsRootRoute,
  path: "/",
  component: ProjectsMainDemoPage,
});

function ProjectsMainDemoPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const demoProjects = [
    {
      id: "1",
      imageOrganization: "https://placehold.co/80x80",
      nameOrganization: "Helping Hands",
      titleProject: "Food Distribution for Homeless",
      descriptionProject:
        "We organize weekly food distribution events supporting over 300 homeless individuals. Volunteers help package, transport, and hand out meals while engaging with the community.",
    },
    {
      id: "2",
      imageOrganization: "https://placehold.co/80x80/ffb300/000",
      nameOrganization: "Green Earth",
      titleProject: "City Park Cleanup Initiative",
      descriptionProject:
        "Our eco-volunteer teams keep the parks clean, recycle collected materials properly, and collaborate with local authorities to maintain sustainable green areas.",
    },
    {
      id: "3",
      imageOrganization: "https://placehold.co/80x80/00aaff/000",
      nameOrganization: "Animal Rescue Group",
      titleProject: "Pet Adoption Marathon",
      descriptionProject:
        "A month-long program where volunteers help rescued animals find new homes. Includes social media promotion, photography, adoption events, and coordination with shelters.",
    },
    {
      id: "4",
      imageOrganization: "https://placehold.co/80x80/00aaff/000",
      nameOrganization: "Animal Rescue Group",
      titleProject: "Pet Adoption Marathon",
      descriptionProject:
        "A month-long program where volunteers help rescued animals find new homes. Includes social media promotion, photography, adoption events, and coordination with shelters.",
    },
  ];

  const totalPages = Math.ceil(demoProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = demoProjects.slice(startIndex, endIndex);

  return (
    <div>
      <ProjectsListWidget projects={currentProjects} />
      <Pagination
        total={totalPages}
        page={currentPage}
        onChange={setCurrentPage}
      />
    </div>
  );
}
