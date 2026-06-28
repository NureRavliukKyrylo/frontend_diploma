import type { AdminUserActivitySummary } from "@entities/admin";
import { Award, CheckCircle2, SlidersHorizontal, Trophy, Users } from "lucide-react";
import type { AdminUsersStyles } from "../../model/types";
import { ActivityCounter } from "../../ui/ActivityCounter";

interface DrawerActivitySectionProps {
  styles: AdminUsersStyles;
  activity?: AdminUserActivitySummary;
  showActivityCounters: boolean;
  onShowActivityCounters: () => void;
}

export const DrawerActivitySection = ({
  styles,
  activity,
  showActivityCounters,
  onShowActivityCounters,
}: DrawerActivitySectionProps) => {
  const activityMetrics = [
    {
      icon: Users,
      label: "Active participations",
      value: activity?.activeParticipations ?? 0,
    },
    {
      icon: CheckCircle2,
      label: "Events attended",
      value: activity?.eventsAttended ?? 0,
    },
    {
      icon: Trophy,
      label: "Approved work logs",
      value: activity?.approvedTaskWorkLogs ?? 0,
    },
    {
      icon: Award,
      label: "Badges earned",
      value: activity?.badgesCount ?? 0,
    },
    {
      icon: SlidersHorizontal,
      label: "Open requests",
      value: activity?.openRequests ?? 0,
    },
  ];
  const activityIsEmpty = activityMetrics.every((metric) => metric.value === 0);

  return (
    <div className={styles.drawerSection}>
      <div className={styles.drawerSectionTitle}>Activity</div>
      {activityIsEmpty && !showActivityCounters ? (
        <div className={styles.activityEmptyState}>
          <span>This user hasn't started volunteering yet</span>
          <button type="button" onClick={onShowActivityCounters}>
            Show all activity counters
          </button>
        </div>
      ) : (
        <div className={styles.activityGrid}>
          {activityMetrics.map((metric) => (
            <ActivityCounter
              key={metric.label}
              icon={metric.icon}
              value={metric.value}
              label={metric.label}
            />
          ))}
        </div>
      )}
    </div>
  );
};
