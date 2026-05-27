import type { Coordinates } from "@shared/config/types";
import type {
  Event,
  EventDetailSearch,
  EventMode,
  FeedbackEventSearch,
  MembersEventSearch,
} from "@entities/event";
import { ActivityFeedbackTab, ActivityMembersTab } from "@widgets/activities";
import { OverviewTab } from "../../overview-tab";
import type { FeedbackSortValues } from "@entities/feedback";
import { TasksTab } from "../../tasks-tab";
import type { TaskDrawerSearch, TasksRequestParams } from "@entities/task";

interface EventTabsProps {
  event: Event;
  userLocation?: Coordinates | null;
  userId?: string;
  search: Omit<EventDetailSearch, "tab">;
  handleSort: (value: FeedbackSortValues) => void;
  filters?: Omit<TasksRequestParams, "Status">;
}

export const getEventMainForms = (
  props: EventTabsProps,
): Record<EventMode, React.ReactNode> => ({
  overview: (
    <OverviewTab event={props.event} userLocation={props.userLocation} />
  ),
  members: (
    <ActivityMembersTab
      entityId={props.event.id}
      userId={props.userId}
      entityType="event"
      PageSize={(props.search as MembersEventSearch).PageSize}
    />
  ),
  feedback: (
    <ActivityFeedbackTab
      entityType="event"
      userId={props.userId}
      entityId={props.event.id}
      PageSize={(props.search as FeedbackEventSearch).PageSize}
      OrderBy={(props.search as FeedbackEventSearch).OrderBy}
      handleSort={props.handleSort}
      canSubmitFeedback={props.event.canSubmitFeedback}
      rating={props.event.rating}
    />
  ),
  tasks: (
    <TasksTab
      search={props.search as TaskDrawerSearch}
      filters={props.filters}
    />
  ),
});
