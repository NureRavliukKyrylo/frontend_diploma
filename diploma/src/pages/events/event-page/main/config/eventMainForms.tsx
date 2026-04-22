import type { Coordinates } from "@shared/config/types";
import type { Event, EventMode } from "@entities/event";
import { ActivityFeedbackTab, ActivityMembersTab } from "@widgets/activities";
import { OverviewTab } from "../../overview-tab";

interface EventTabsProps {
  event: Event;
  userLocation?: Coordinates | null;
  userId?: string;
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
      entityType="project"
    />
  ),
  feedback: (
    <ActivityFeedbackTab
      entityType="event"
      userId={props.userId}
      entityId={props.event.id}
    />
  ),
  tasks: <></>,
});
