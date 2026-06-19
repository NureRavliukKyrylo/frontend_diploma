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

export const getMemberName = (member: OrganizationMember) =>
  [member.firstName, member.lastName].filter(Boolean).join(" ") || "Team Member";

export const getDirectoryMemberName = (
  firstName?: string | null,
  lastName?: string | null,
) =>
  [lastName, firstName].filter(Boolean).join(" ") ||
  [firstName, lastName].filter(Boolean).join(" ") ||
  "Team Member";

export const formatDate = (value?: string | null) => {
  if (!value) return "Not added yet";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-US", {
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
}

export const buildMemberDirectoryCards = ({
  members,
  ownerId,
}: BuildMemberDirectoryCardsParams): DirectoryMemberCard[] => {
  const normalizedOwnerId = ownerId?.trim();
  return members.map((member) => {
    const normalizedRole = member.role?.trim();
    const isOwnerCard = Boolean(normalizedOwnerId) && member.id === normalizedOwnerId;

    return {
      id: member.id,
      name: getDirectoryMemberName(member.firstName, member.lastName),
      isOwner: isOwnerCard,
      roleLabel:
        isOwnerCard
          ? "Founder"
          : normalizedRole && normalizedRole.length > 0
            ? normalizedRole
            : "Volunteer",
      avatarUrl: member.avatarUrl ?? null,
      profilePath: "/profile" as const,
    };
  });
};
