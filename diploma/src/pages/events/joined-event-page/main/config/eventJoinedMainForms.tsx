import type { Coordinates } from "@shared/config/types";
import type {
  Event,
  EventDetailSearch,
  EventJoinedMode,
} from "@entities/event";
import type { TasksRequestParams } from "@entities/task";
import { OverviewTabJoined } from "../../overview-tab/ui/OverviewTabJoined";
import { AttendanceTabJoined } from "../../attendance-tab";
import { JoinedFeedbackTab } from "@widgets/feedback";
import { TasksTabJoined } from "../../tasks-tab";

interface EventJoinedTabsProps {
  event: Event;
  userLocation?: Coordinates | null;
  search: Omit<EventDetailSearch, "tab">;
  filters?: Omit<TasksRequestParams, "Status">;
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
  tasks: <TasksTabJoined />,
  attendance: <AttendanceTabJoined />,
});
