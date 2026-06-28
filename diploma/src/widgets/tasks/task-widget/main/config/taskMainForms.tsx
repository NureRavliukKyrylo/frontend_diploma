import type { Coordinates } from "@shared/config/types";
import { OverviewTab } from "../../overview-tab";
import type { Task, TaskDrawerSearch, TaskMode } from "@entities/task";
import { ActivityFeedbackTab, EntityMembersPanel } from "@widgets/activities";
import type { FeedbackSortValues } from "@entities/feedback";
import { TaskCommentsTab } from "../../../task-comments/ui/comments-tab/TaskCommentsTab";
import type { TFunction } from "i18next";
import { TaskRolesTab } from "../ui/tabs/TaskRolesTab";
import { TaskTimeLogsTab } from "../ui/tabs/time-logs/ui/TaskTimeLogsTab";
import { canManageTaskMembers } from "../lib/canManageTask";

interface TaskTabsProps {
  task: Task;
  userLocation?: Coordinates | null;
  userId?: string;
  userName?: string;
  avatarUrl?: string;
  search?: TaskDrawerSearch;
  handleSort: (value: FeedbackSortValues) => void;
  t: TFunction;
}

export const getTaskMainForms = (
  props: TaskTabsProps,
): Record<TaskMode, React.ReactNode> => ({
  overview: <OverviewTab task={props.task} userLocation={props.userLocation} />,
  comments: (
    <TaskCommentsTab
      PageSize={props.search?.DrawerPageSize ?? 7}
      taskId={props.task.id}
      userId={props.userId}
      userName={props.userName}
      avatarUrl={props.avatarUrl}
    />
  ),
  members: (
    <EntityMembersPanel
      entityId={props.task.id}
      userId={props.userId}
      entityType="task"
      canManage={canManageTaskMembers(props.task)}
      pageSize={props.search?.DrawerPageSize ?? 8}
      labels={{
        loading: props.t("common:entityMembers.loading"),
        error: props.t("common:entityMembers.error"),
        empty: props.t("common:entityMembers.empty"),
        confirmRemoveTitle: props.t("common:entityMembers.confirmRemoveTitle"),
        confirmRemoveText: props.t("common:entityMembers.confirmRemoveText"),
        confirmRemove: props.t("common:entityMembers.confirmRemove"),
        cancel: props.t("common:entityMembers.cancel"),
        roleUpdated: props.t("common:entityMembers.roleUpdated"),
        roleUpdateFailed: props.t("common:entityMembers.roleUpdateFailed"),
        memberRemoved: props.t("common:entityMembers.memberRemoved"),
        memberRemoveFailed: props.t("common:entityMembers.memberRemoveFailed"),
        missingParticipation: props.t(
          "common:entityMembers.missingParticipation",
        ),
      }}
    />
  ),
  feedbacks: (
    <ActivityFeedbackTab
      entityType="task"
      userId={props.userId}
      entityId={props.task.id}
      PageSize={props.search?.DrawerPageSize ?? 3}
      OrderBy={props.search?.DrawerOrderBy ?? "Default"}
      handleSort={props.handleSort}
      canSubmitFeedback={props.task.canSubmitFeedback}
      rating={props.task.rating}
    />
  ),
  roles: (
    <TaskRolesTab
      task={props.task}
      labels={{
        loading: props.t("task:roles.loading"),
        error: props.t("task:roles.error"),
        empty: props.t("task:roles.empty"),
      }}
    />
  ),
  timelog: (
    <TaskTimeLogsTab
      task={props.task}
      pageSize={props.search?.DrawerPageSize ?? 20}
      labels={{
        loading: props.t("task:timelog.loading"),
        error: props.t("task:timelog.error"),
        empty: props.t("task:timelog.empty"),
        table: {
          volunteer: props.t("task:timelog.table.volunteer"),
          logged: props.t("task:timelog.table.logged"),
          adjusted: props.t("task:timelog.table.adjusted"),
          approved: props.t("task:timelog.table.approved"),
          status: props.t("task:timelog.table.status"),
          note: props.t("task:timelog.table.note"),
          actions: props.t("task:timelog.table.actions"),
          notProvided: props.t("task:timelog.table.notProvided"),
        },
        controls: {
          allStatuses: props.t("task:timelog.controls.allStatuses"),
          export: props.t("task:timelog.controls.export"),
        },
        actions: {
          managerEdit: props.t("task:timelog.actions.managerEdit"),
          approve: props.t("task:timelog.actions.approve"),
          reject: props.t("task:timelog.actions.reject"),
          resolve: props.t("task:timelog.actions.resolve"),
          resolveAsApprove: props.t("task:timelog.actions.resolveAsApprove"),
          resolveAsReject: props.t("task:timelog.actions.resolveAsReject"),
        },
        modal: {
          title: props.t("task:timelog.modal.title"),
          text: props.t("task:timelog.modal.text"),
          minutes: props.t("task:timelog.modal.minutes"),
          finalMinutes: props.t("task:timelog.modal.finalMinutes"),
          commentPlaceholder: props.t("task:timelog.modal.commentPlaceholder"),
          confirm: props.t("task:timelog.modal.confirm"),
          cancel: props.t("task:timelog.modal.cancel"),
        },
        notifications: {
          saved: props.t("task:timelog.notifications.saved"),
          failed: props.t("task:timelog.notifications.failed"),
          exported: props.t("task:timelog.notifications.exported"),
        },
      }}
    />
  ),
});
