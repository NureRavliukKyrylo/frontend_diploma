import type {
  ApiOrganizationTaskItem,
  ApiOrganizationTasksResponse,
  OrganizationTaskLinkedEntityType,
  OrganizationTaskRecord,
  OrganizationTaskStatus,
} from "../model/types/OrganizationTask";

export const getOrganizationTaskResponseItems = (
  response?: ApiOrganizationTasksResponse | null,
) => response?.data ?? response?.Data ?? [];

const normalizeTaskStatus = (
  value: ApiOrganizationTaskItem["status"],
): OrganizationTaskStatus => {
  if (typeof value === "number") {
    switch (value) {
      case 1:
        return "InProgress";
      case 2:
        return "Completed";
      case 3:
        return "Cancelled";
      case 0:
      default:
        return "Pending";
    }
  }

  if (typeof value === "string") {
    const normalized = value.replace(/\s+/g, "").toLowerCase();

    switch (normalized) {
      case "inprogress":
        return "InProgress";
      case "completed":
        return "Completed";
      case "cancelled":
        return "Cancelled";
      case "pending":
      default:
        return "Pending";
    }
  }

  return "Pending";
};

const normalizeLinkedEntityType = (
  value?: string | null,
): OrganizationTaskLinkedEntityType => {
  if (!value) return null;

  const normalized = value.trim().toLowerCase();

  if (normalized === "project") return "project";
  if (normalized === "event") return "event";

  return null;
};

const normalizeOrganizationTask = (
  task: ApiOrganizationTaskItem,
  organizationId: string,
): OrganizationTaskRecord | null => {
  const id = task.id ?? task.Id;

  if (!id) return null;

  const linkedEntity = task.linkedEntity ?? task.LinkedEntity;

  return {
    id,
    organizationId:
      task.organizationId?.trim() ||
      task.OrganizationId?.trim() ||
      organizationId,
    projectId: task.projectId?.trim() || task.ProjectId?.trim() || null,
    title: task.title?.trim() || task.Title?.trim() || "Untitled task",
    dueAt: task.endAt ?? task.EndAt ?? null,
    status: normalizeTaskStatus(task.status ?? task.Status),
    assignedToUserId:
      task.assignedToUserId?.trim() ||
      task.AssignedToUserId?.trim() ||
      null,
    linkedEntityType: normalizeLinkedEntityType(
      linkedEntity?.entityType ?? linkedEntity?.EntityType,
    ),
    linkedEntityTitle:
      linkedEntity?.title?.trim() ||
      linkedEntity?.Title?.trim() ||
      null,
  };
};

export const normalizeOrganizationTasks = (
  response: ApiOrganizationTasksResponse,
  organizationId: string,
  projectIds: string[],
): OrganizationTaskRecord[] => {
  const projectIdSet = new Set(projectIds);

  return getOrganizationTaskResponseItems(response)
    .filter((task) => {
      const normalizedOrganizationId =
        task.organizationId?.trim() || task.OrganizationId?.trim();

      if (normalizedOrganizationId === organizationId) return true;

      const projectId = task.projectId?.trim() || task.ProjectId?.trim();
      return Boolean(projectId && projectIdSet.has(projectId));
    })
    .map((task) => normalizeOrganizationTask(task, organizationId))
    .filter((task): task is OrganizationTaskRecord => task !== null);
};
