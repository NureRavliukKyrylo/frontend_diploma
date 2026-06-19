export type OrganizationTaskStatus =
  | "Pending"
  | "InProgress"
  | "Completed"
  | "Cancelled";

export type OrganizationTaskLinkedEntityType = "project" | "event" | null;

export interface ApiTaskLinkedEntity {
  entityType?: string | null;
  EntityType?: string | null;
  entityId?: string | null;
  EntityId?: string | null;
  title?: string | null;
  Title?: string | null;
}

export interface ApiOrganizationTaskItem {
  id?: string | null;
  Id?: string | null;
  organizationId?: string | null;
  OrganizationId?: string | null;
  projectId?: string | null;
  ProjectId?: string | null;
  title?: string | null;
  Title?: string | null;
  endAt?: string | null;
  EndAt?: string | null;
  status?: number | string | null;
  Status?: number | string | null;
  assignedToUserId?: string | null;
  AssignedToUserId?: string | null;
  linkedEntity?: ApiTaskLinkedEntity | null;
  LinkedEntity?: ApiTaskLinkedEntity | null;
}

export interface ApiOrganizationTasksResponse {
  data?: ApiOrganizationTaskItem[];
  Data?: ApiOrganizationTaskItem[];
}

export interface ApiTaskBoardColumn {
  items?: ApiOrganizationTaskItem[];
  Items?: ApiOrganizationTaskItem[];
}

export interface ApiTaskBoard {
  columns?: ApiTaskBoardColumn[];
  Columns?: ApiTaskBoardColumn[];
}

export interface ApiTaskBoardResponse {
  data?: ApiTaskBoard;
  Data?: ApiTaskBoard;
}

export interface OrganizationTaskRecord {
  id: string;
  organizationId: string;
  projectId: string | null;
  title: string;
  dueAt: string | null;
  status: OrganizationTaskStatus;
  assignedToUserId: string | null;
  linkedEntityType: OrganizationTaskLinkedEntityType;
  linkedEntityTitle: string | null;
}
