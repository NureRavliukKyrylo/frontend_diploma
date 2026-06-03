import type { Coordinates } from "@shared/config/types";
import type {
  AttendanceEventSearch,
  Event,
  EventJoinedMode,
  JoinedEventSearch,
} from "@entities/event";
import type {
  MyTasksRequestParams,
  TaskDrawerJoinedSearch,
} from "@entities/task";
import { OverviewTabJoined } from "../../overview-tab/ui/OverviewTabJoined";
import { AttendanceTabJoined } from "../../attendance-tab";
import { JoinedFeedbackTab } from "@widgets/feedback";
import { TasksTabJoined } from "../../tasks-tab";

interface EventJoinedTabsProps {
  event: Event;
  userLocation?: Coordinates | null;
  search: Omit<JoinedEventSearch, "tab">;
  filters?: Omit<MyTasksRequestParams, "Status">;
}

export const getJoinedEventMainForms = (
  props: EventJoinedTabsProps,
): Record<EventJoinedMode, React.ReactNode> => ({
  overview: (
    <OverviewTabJoined event={props.event} userLocation={props.userLocation} />
  ),
  feedback: (
    <JoinedFeedbackTab
      entityType="event"
      entityId={props.event.id}
      canSubmitFeedback={props.event.canSubmitFeedback}
    />
  ),
  tasks: (
    <TasksTabJoined
      search={props.search as TaskDrawerJoinedSearch}
      filters={props.filters}
    />
  ),
  attendance: (
    <AttendanceTabJoined
      eventId={props.event.id}
      search={props.search as AttendanceEventSearch}
      eventTitle={props.event.title}
    />
  ),
});
