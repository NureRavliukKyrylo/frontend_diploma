import type {
  OrganizationTaskRecord,
  OrganizationTaskStatus,
  TaskSortValues,
} from "@entities/task";

export type OrganizationTaskStateFilter =
  | "AllTasks"
  | "Pending"
  | "InProgress"
  | "Completed"
  | "Cancelled";

export interface OrganizationTaskListItem {
  id: string;
  title: string;
  description: string;
  dueAt: string;
  dueDateLabel: string;
  status: OrganizationTaskStatus;
  assignedToUserId: string | null;
  order: number;
}

export interface OrganizationTaskSearchState {
  Search?: string;
  OrderBy?: TaskSortValues;
  State?: OrganizationTaskStateFilter;
  DueBefore?: string;
  OnlyAssigned?: boolean;
  WithDueDateOnly?: boolean;
}

interface FilterOrganizationTaskListItemsParams {
  items: OrganizationTaskListItem[];
  search: OrganizationTaskSearchState;
}

export const organizationTaskSearchDefaults: OrganizationTaskSearchState = {
  Search: undefined,
  OrderBy: "Default",
  State: "AllTasks",
  DueBefore: undefined,
  OnlyAssigned: false,
  WithDueDateOnly: false,
};

export const organizationTaskStateOptions: Array<{
  label: string;
  value: OrganizationTaskStateFilter;
}> = [
  { label: "All tasks", value: "AllTasks" },
  { label: "Pending", value: "Pending" },
  { label: "In progress", value: "InProgress" },
  { label: "Completed", value: "Completed" },
  { label: "Cancelled", value: "Cancelled" },
];

const formatTaskDueDate = (value?: string | null) => {
  if (!value) return "No due date";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "No due date";

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const buildTaskDescription = (task: OrganizationTaskRecord) => {
  if (!task.linkedEntityTitle) {
    return "Linked to the current organization workspace.";
  }

  const prefix = task.linkedEntityType === "event" ? "Event" : "Project";
  return `${prefix}: ${task.linkedEntityTitle}`;
};

export const buildOrganizationTaskListItems = (
  tasks: OrganizationTaskRecord[],
): OrganizationTaskListItem[] =>
  tasks.map((task, index) => ({
    id: task.id,
    title: task.title,
    description: buildTaskDescription(task),
    dueAt: task.dueAt ?? "",
    dueDateLabel: formatTaskDueDate(task.dueAt),
    status: task.status,
    assignedToUserId: task.assignedToUserId,
    order: index,
  }));

export const buildOrganizationTasksSummary = (items: OrganizationTaskListItem[]) => ({
  total: items.length,
  inProgress: items.filter((item) => item.status === "InProgress").length,
  completed: items.filter((item) => item.status === "Completed").length,
});

const matchesTaskState = (
  item: OrganizationTaskListItem,
  state: OrganizationTaskStateFilter,
) => {
  switch (state) {
    case "Pending":
      return item.status === "Pending";
    case "InProgress":
      return item.status === "InProgress";
    case "Completed":
      return item.status === "Completed";
    case "Cancelled":
      return item.status === "Cancelled";
    case "AllTasks":
    default:
      return true;
  }
};

export const filterAndSortOrganizationTaskListItems = ({
  items,
  search,
}: FilterOrganizationTaskListItemsParams) => {
  const searchValue = search.Search?.trim().toLowerCase();
  const dueBeforeTimestamp = search.DueBefore
    ? new Date(search.DueBefore).getTime()
    : null;

  const filteredItems = items.filter((item) => {
    if (search.State && !matchesTaskState(item, search.State)) {
      return false;
    }

    if (search.OnlyAssigned && !item.assignedToUserId) {
      return false;
    }

    if (search.WithDueDateOnly && !item.dueAt) {
      return false;
    }

    if (
      dueBeforeTimestamp &&
      new Date(item.dueAt).getTime() > dueBeforeTimestamp
    ) {
      return false;
    }

    if (!searchValue) {
      return true;
    }

    return (
      item.title.toLowerCase().includes(searchValue) ||
      item.description.toLowerCase().includes(searchValue) ||
      item.status.toLowerCase().includes(searchValue)
    );
  });

  return [...filteredItems].sort((left, right) => {
    switch (search.OrderBy) {
      case "TitleAsc":
        return left.title.localeCompare(right.title);
      case "TitleDesc":
        return right.title.localeCompare(left.title);
      case "EndingSoon":
        return new Date(left.dueAt).getTime() - new Date(right.dueAt).getTime();
      case "Newest":
        return new Date(right.dueAt).getTime() - new Date(left.dueAt).getTime();
      case "Default":
      default:
        return left.order - right.order;
    }
  });
};
