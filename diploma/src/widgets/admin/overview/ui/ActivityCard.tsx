import { Skeleton } from "@heroui/react";
import type { TFunction } from "i18next";
import { ClipboardList, Flag } from "lucide-react";
import { formatTimeAgo } from "@shared/libs/date";
import type { ActivityFeedItem, AdminOverviewStyles } from "../model/types";

interface ActivityCardProps {
  styles: AdminOverviewStyles;
  activityFeed: ActivityFeedItem[];
  isLoading: boolean;
  isError: boolean;
  t: TFunction;
}

export const ActivityCard = ({
  styles,
  activityFeed,
  isLoading,
  isError,
  t,
}: ActivityCardProps) => (
  <div className={styles.activityCard}>
    <span className={styles.activityDeco} aria-hidden="true" />
    {isLoading ? (
      <div className={styles.activityList}>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className={styles.activityRow}>
            <Skeleton className={styles.activityIconSkeleton} />
            <Skeleton className={styles.activityTextSkeleton} />
            <Skeleton className={styles.activityTimeSkeleton} />
          </div>
        ))}
      </div>
    ) : isError ? (
      <div className={styles.activityUnavailable}>
        <span className={styles.activityUnavailableTitle}>
          {t("admin:overview.activity.unavailable")}
        </span>
        <span className={styles.activityUnavailableText}>
          {t("admin:overview.activity.loadError")}
        </span>
      </div>
    ) : activityFeed.length === 0 ? (
      <div className={styles.activityUnavailable}>
        <span className={styles.activityUnavailableTitle}>
          {t("admin:overview.activity.empty")}
        </span>
        <span className={styles.activityUnavailableText}>
          {t("admin:overview.activity.emptyText")}
        </span>
      </div>
    ) : (
      <div className={styles.activityList}>
        {activityFeed.map((item) => {
          const ActivityIcon = item.type === "report" ? Flag : ClipboardList;

          return (
            <div key={item.id} className={styles.activityRow}>
              <span
                className={`${styles.activityIcon} ${
                  item.type === "report"
                    ? styles.activityIcon_report
                    : styles.activityIcon_request
                }`}
              >
                <ActivityIcon size={18} aria-hidden="true" />
              </span>
              <span className={styles.activityText}>{item.description}</span>
              <span className={styles.activityTime}>
                {formatTimeAgo(item.createdAt, t)}
              </span>
            </div>
          );
        })}
      </div>
    )}
  </div>
);
