import type { Organization } from "@entities/organization";
import type { Project, ProjectSortValues } from "@entities/project";
import type { AvatarItem } from "@shared/config/types";

export type OrganizationProjectsStatusFilter = "all" | "active" | "completed";

export interface OrganizationProjectCardData {
  id: string;
  title: string;
  description: string;
  deadlineLabel: string;
  progressPercent: number;
  progressLabel: string;
  progressItemsLabel: string;
  tasksTotal: number;
  avatarItems: AvatarItem[];
  organizationName: string;
  organizationLogoUrl: string | null;
}

export interface OrganizationProjectsSummary {
  total: number;
  active: number;
  completed: number;
}

const clampPercent = (value?: number | null) => {
  if (typeof value !== "number" || Number.isNaN(value)) return 0;
  return Math.min(100, Math.max(0, Math.round(value)));
};

const formatProjectDeadline = (value?: string | null) => {
  if (!value) return "No deadline yet";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "No deadline yet";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const buildProjectAvatarItems = (project: Project): AvatarItem[] =>
  (project.memberPreviews ?? []).slice(0, 5).map((member) => ({
    name:
      [member.firstName, member.lastName].filter(Boolean).join(" ").trim() ||
      "Project member",
    src: member.avatarUrl ?? undefined,
  }));

const mapRealProjectToCard = (
  project: Project,
  organization: Organization,
): OrganizationProjectCardData => {
  const progressPercent = clampPercent(project.progress?.percent);
  const tasksTotal = Math.max(project.tasksTotal, 0);

  return {
    id: project.id,
    title: project.title,
    description: project.description,
    deadlineLabel: formatProjectDeadline(project.endAt),
    progressPercent,
    progressLabel: `${progressPercent}%`,
    progressItemsLabel: `${tasksTotal} task${tasksTotal === 1 ? "" : "s"}`,
    tasksTotal,
    avatarItems: buildProjectAvatarItems(project),
    organizationName:
      project.organization?.name?.trim() || organization.name.trim() || "organization",
    organizationLogoUrl: project.organization?.logoUrl ?? organization.logoUrl ?? null,
  };
};

export const buildOrganizationProjectCards = ({
  organization,
  projects,
}: {
  organization: Organization;
  projects: Project[];
}): OrganizationProjectCardData[] => {
  const explicitOrganizationMatches = projects.filter(
    (project) => project.organization?.id === organization.id,
  );

  const scopedProjects =
    explicitOrganizationMatches.length > 0 ? explicitOrganizationMatches : projects;

  if (scopedProjects.length === 0) {
    return [];
  }

  return scopedProjects.map((project) =>
    mapRealProjectToCard(project, organization),
  );
};

export const buildOrganizationProjectsSummary = (
  cards: OrganizationProjectCardData[],
): OrganizationProjectsSummary => ({
  total: cards.length,
  active: cards.filter((card) => card.progressPercent < 100).length,
  completed: cards.filter((card) => card.progressPercent >= 100).length,
});

export const filterAndSortOrganizationProjectCards = ({
  cards,
  search,
  status,
  sort,
}: {
  cards: OrganizationProjectCardData[];
  search: string;
  status: OrganizationProjectsStatusFilter;
  sort: ProjectSortValues;
}) => {
  const normalizedSearch = search.trim().toLowerCase();

  const filteredCards = cards.filter((card) => {
    const matchesStatus =
      status === "all"
        ? true
        : status === "active"
          ? card.progressPercent < 100
          : card.progressPercent >= 100;

    const matchesSearch =
      normalizedSearch.length === 0
        ? true
        : [card.title, card.description, card.organizationName].some((value) =>
            value.toLowerCase().includes(normalizedSearch),
          );

    return matchesStatus && matchesSearch;
  });

  const sortedCards = [...filteredCards];

  switch (sort) {
    case "TitleAsc":
      sortedCards.sort((left, right) => left.title.localeCompare(right.title));
      break;
    case "TitleDesc":
      sortedCards.sort((left, right) => right.title.localeCompare(left.title));
      break;
    case "Newest":
      sortedCards.sort((left, right) => right.id.localeCompare(left.id));
      break;
    case "EndingSoon":
      sortedCards.sort((left, right) => {
        if (left.deadlineLabel === "No deadline yet") return 1;
        if (right.deadlineLabel === "No deadline yet") return -1;
        return new Date(left.deadlineLabel).getTime() - new Date(right.deadlineLabel).getTime();
      });
      break;
    default:
      break;
  }

  return sortedCards;
};
