import type {
  Organization,
  OrganizationCategoryStats,
  OrganizationMember,
} from "@entities/organization";
import type { Project } from "@entities/project";

type CategoryTone = "orange" | "red" | "neutral";

export interface ResolvedCategoryCard {
  id: string;
  categoryId?: string;
  title: string;
  allTasks?: number;
  activeTasks?: number;
  tone: CategoryTone;
  imageSrc?: string | null;
}

export interface DirectoryMemberCard {
  id: string;
  name: string;
  roleLabel: string;
  avatarUrl?: string | null;
  isOwner: boolean;
  profilePath: "/profile";
}

const toneByIndex: CategoryTone[] = [
  "orange",
  "neutral",
  "red",
  "neutral",
];

export const getMemberName = (
  member: OrganizationMember,
  fallback = "Team member",
) => [member.firstName, member.lastName].filter(Boolean).join(" ") || fallback;

export const getDirectoryMemberName = (
  firstName?: string | null,
  lastName?: string | null,
  fallback = "Team member",
) =>
  [lastName, firstName].filter(Boolean).join(" ") ||
  [firstName, lastName].filter(Boolean).join(" ") ||
  fallback;

export const formatDate = (
  value: string | null | undefined,
  locale: string,
  fallback: string,
) => {
  if (!value) return fallback;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export const shortenText = (value: string, length: number) => {
  if (value.length <= length) return value;
  return `${value.slice(0, length).trimEnd()}...`;
};

const toResolvedCategory = (
  category: OrganizationCategoryStats,
  index: number,
  totalProjects: number,
): ResolvedCategoryCard => ({
  id: category.categoryId,
  categoryId: category.categoryId,
  title: category.name,
  allTasks: category.tasksTotal + totalProjects,
  activeTasks: category.tasksActive,
  tone: toneByIndex[index % toneByIndex.length],
  imageSrc: category.imageUrl ?? null,
});

const buildProjectCountByCategoryId = (projects: Project[]) => {
  const counts = new Map<string, number>();

  projects.forEach((project) => {
    const categoryIds = Array.isArray(project.categories)
      ? project.categories.map((category) => category.id)
      : [];

    categoryIds.forEach((categoryId) => {
      counts.set(categoryId, (counts.get(categoryId) ?? 0) + 1);
    });
  });

  return counts;
};

export const buildResolvedCategoryCards = (
  organization: Organization,
  projects: Project[],
): ResolvedCategoryCard[] => {
  const projectCountByCategoryId = buildProjectCountByCategoryId(projects);

  if (organization.categoryStats?.length) {
    return organization.categoryStats.slice(0, 4).map((category, index) =>
      toResolvedCategory(
        category,
        index,
        projectCountByCategoryId.get(category.categoryId) ?? 0,
      ),
    );
  }

  if (organization.categories?.length) {
    return organization.categories.slice(0, 4).map((title, index) => ({
      id: `category-${index}`,
      title,
      tone: toneByIndex[index % toneByIndex.length],
      imageSrc: null,
    }));
  }

  return [];
};

interface BuildMemberDirectoryCardsParams {
  members: OrganizationMember[];
  ownerId?: string | null;
  founderLabel: string;
  volunteerLabel: string;
  teamMemberLabel: string;
}

export const buildMemberDirectoryCards = ({
  members,
  ownerId,
  founderLabel,
  volunteerLabel,
  teamMemberLabel,
}: BuildMemberDirectoryCardsParams): DirectoryMemberCard[] => {
  const normalizedOwnerId = ownerId?.trim();
  return members.map((member) => {
    const normalizedRole = member.role?.trim();
    const isOwnerCard = Boolean(normalizedOwnerId) && member.id === normalizedOwnerId;

    return {
      id: member.id,
      name: getDirectoryMemberName(
        member.firstName,
        member.lastName,
        teamMemberLabel,
      ),
      isOwner: isOwnerCard,
      roleLabel:
        isOwnerCard
          ? founderLabel
          : normalizedRole && normalizedRole.length > 0
            ? normalizedRole
            : volunteerLabel,
      avatarUrl: member.avatarUrl ?? null,
      profilePath: "/profile" as const,
    };
  });
};
