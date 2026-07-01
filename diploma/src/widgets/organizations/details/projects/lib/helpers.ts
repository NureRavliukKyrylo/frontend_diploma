import type { TFunction } from "i18next";
import type { Organization } from "@entities/organization";
import type { Project, ProjectSortValues } from "@entities/project";
import type { AvatarItem } from "@shared/config/types";

export type OrganizationProjectsStatusFilter = "all" | "active" | "completed";

export interface OrganizationProjectCardData {
  id: string;
  title: string;
  description: string;
  deadlineLabel: string;
  deadlineAt: number | null;
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

const formatProjectDeadline = (
  value: string | null | undefined,
  t: TFunction,
  locale: string,
) => {
  if (!value) return t("details.projects.noDeadline");

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return t("details.projects.noDeadline");

  return date.toLocaleDateString(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const buildProjectAvatarItems = (
  project: Project,
  t: TFunction,
): AvatarItem[] =>
  (project.memberPreviews ?? []).slice(0, 5).map((member) => ({
    name:
      [member.firstName, member.lastName].filter(Boolean).join(" ").trim() ||
      t("details.projects.projectMember"),
    src: member.avatarUrl ?? undefined,
  }));

const mapRealProjectToCard = (
  project: Project,
  organization: Organization,
  t: TFunction,
  locale: string,
): OrganizationProjectCardData => {
  const progressPercent = clampPercent(project.progress?.percent);
  const tasksTotal = Math.max(project.tasksTotal, 0);
  const parsedDeadline = project.endAt ? new Date(project.endAt).getTime() : NaN;

  return {
    id: project.id,
    title: project.title,
    description: project.description,
    deadlineLabel: formatProjectDeadline(project.endAt, t, locale),
    deadlineAt: Number.isNaN(parsedDeadline) ? null : parsedDeadline,
    progressPercent,
    progressLabel: `${progressPercent}%`,
    progressItemsLabel: t("details.projects.taskCount", {
      count: tasksTotal,
    }),
    tasksTotal,
    avatarItems: buildProjectAvatarItems(project, t),
    organizationName:
      project.organization?.name?.trim() ||
      organization.name.trim() ||
      t("details.projects.organizationFallback"),
    organizationLogoUrl: project.organization?.logoUrl ?? organization.logoUrl ?? null,
  };
};

export const buildOrganizationProjectCards = ({
  organization,
  projects,
  t,
  locale,
}: {
  organization: Organization;
  projects: Project[];
  t: TFunction;
  locale: string;
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
    mapRealProjectToCard(project, organization, t, locale),
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
        if (left.deadlineAt === null) return 1;
        if (right.deadlineAt === null) return -1;
        return left.deadlineAt - right.deadlineAt;
      });
      break;
    default:
      break;
  }

  return sortedCards;
};
