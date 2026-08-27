import type { TFunction } from "i18next";
import type { AvatarItem } from "@shared/config/types";
import type { OrganizationMember } from "@entities/organization";
import type { Project } from "@entities/project";
import type {
  OrganizationTaskRecord,
  OrganizationTaskStatus,
} from "@entities/task";

export interface ProjectPreviewCardData {
  id: string;
  title: string;
  description: string;
  progressPercent: number;
  progressLabel: string;
  tasksLabel: string;
}

export interface ProjectTaskRowData {
  id: string;
  task: string;
  description: string;
  assignees: AvatarItem[];
  dueDate: string;
  status: OrganizationTaskStatus;
}

export const VISIBLE_PROJECTS_COUNT = 3;

const clampPercent = (value?: number | null) => {
  if (typeof value !== "number" || Number.isNaN(value)) return 0;
  return Math.min(100, Math.max(0, Math.round(value)));
};

const formatLongDate = (
  value: string | null | undefined,
  t: TFunction,
  locale: string,
) => {
  if (!value) return t("details.showcase.noDueDate");

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return t("details.showcase.noDueDate");

  return date.toLocaleDateString(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const buildTaskContextDescription = (
  task: OrganizationTaskRecord,
  t: TFunction,
) => {
  if (!task.linkedEntityTitle) {
    return t("details.showcase.linkedWorkspace");
  }

  return t(
    task.linkedEntityType === "event"
      ? "details.showcase.eventContext"
      : "details.showcase.projectContext",
    { title: task.linkedEntityTitle },
  );
};

const resolveTaskAssignees = (
  task: OrganizationTaskRecord,
  members: OrganizationMember[],
  t: TFunction,
): AvatarItem[] => {
  if (!task.assignedToUserId) {
    return [];
  }

  const assignedMember = members.find(
    (member) => member.id === task.assignedToUserId,
  );

  if (!assignedMember) {
    return [{ name: t("details.showcase.assigned") }];
  }

  return [
    {
      src: assignedMember.avatarUrl ?? undefined,
      name:
        [assignedMember.firstName, assignedMember.lastName]
          .filter(Boolean)
          .join(" ")
          .trim() || t("details.showcase.assignedMember"),
    },
  ];
};

export const hasProjectCarouselControls = (projectsCount: number) =>
  projectsCount > VISIBLE_PROJECTS_COUNT;

export const buildProjectPreviewCards = (
  projects: Project[],
  t: TFunction,
): ProjectPreviewCardData[] =>
  projects.map((project) => {
    const progressPercent = clampPercent(project.progress?.percent);
    const tasksTotal = Math.max(project.tasksTotal, 0);

    return {
      id: project.id,
      title: project.title,
      description:
        project.description?.trim() || t("details.showcase.projectFallback"),
      progressPercent,
      progressLabel: `${progressPercent}%`,
      tasksLabel: t("details.showcase.taskCount", { count: tasksTotal }),
    };
  });

export const getVisibleProjects = (
  projects: ProjectPreviewCardData[],
  carouselOffset: number,
) => {
  if (projects.length <= VISIBLE_PROJECTS_COUNT) {
    return projects;
  }

  return Array.from({ length: VISIBLE_PROJECTS_COUNT }, (_, index) => {
    return projects[(carouselOffset + index) % projects.length];
  });
};

export const buildProjectTaskRows = (
  tasks: OrganizationTaskRecord[],
  members: OrganizationMember[],
  t: TFunction,
  locale: string,
): ProjectTaskRowData[] =>
  [...tasks]
    .sort((left, right) => {
      const leftTimestamp = left.dueAt
        ? new Date(left.dueAt).getTime()
        : Number.MAX_SAFE_INTEGER;
      const rightTimestamp = right.dueAt
        ? new Date(right.dueAt).getTime()
        : Number.MAX_SAFE_INTEGER;

      return leftTimestamp - rightTimestamp;
    })
    .slice(0, 4)
    .map((task) => ({
      id: task.id,
      task: task.title,
      description: buildTaskContextDescription(task, t),
      assignees: resolveTaskAssignees(task, members, t),
      dueDate: formatLongDate(task.dueAt, t, locale),
      status: task.status,
    }));
