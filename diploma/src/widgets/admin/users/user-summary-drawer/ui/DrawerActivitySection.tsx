import type { AdminUserActivitySummary } from "@entities/admin";
import {
  Award,
  CheckCircle2,
  SlidersHorizontal,
  Trophy,
  Users,
} from "lucide-react";
import type { AdminUsersStyles } from "../../model/types";
import { ActivityCounter } from "../../ui/ActivityCounter";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("admin");
  const activityMetrics = [
    {
      icon: Users,
      label: t("users.drawer.activityMetrics.participations"),
      value: activity?.activeParticipations ?? 0,
    },
    {
      icon: CheckCircle2,
      label: t("users.drawer.activityMetrics.events"),
      value: activity?.eventsAttended ?? 0,
    },
    {
      icon: Trophy,
      label: t("users.drawer.activityMetrics.workLogs"),
      value: activity?.approvedTaskWorkLogs ?? 0,
    },
    {
      icon: Award,
      label: t("users.drawer.activityMetrics.badges"),
      value: activity?.badgesCount ?? 0,
    },
    {
      icon: SlidersHorizontal,
      label: t("users.drawer.activityMetrics.requests"),
      value: activity?.openRequests ?? 0,
    },
  ];
  const activityIsEmpty = activityMetrics.every((metric) => metric.value === 0);

  return (
    <div className={styles.drawerSection}>
      <div className={styles.drawerSectionTitle}>
        {t("users.drawer.activity")}
      </div>
      {activityIsEmpty && !showActivityCounters ? (
        <div className={styles.activityEmptyState}>
          <span>{t("users.drawer.activityEmpty")}</span>
          <button type="button" onClick={onShowActivityCounters}>
            {t("users.drawer.showActivity")}
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
