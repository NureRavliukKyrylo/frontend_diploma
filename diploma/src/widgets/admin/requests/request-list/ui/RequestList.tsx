import type { AdminRequestListItem } from "@entities/admin";
import { Skeleton } from "@heroui/react";
import { formatTimeAgo } from "@shared/libs/date";
import { RequestActions } from "@widgets/admin/requests/request-actions/ui/RequestActions";
import {
  canOpenRequestDrawer,
  getStatusClassName,
} from "@widgets/admin/requests/requests-config/libs/requestHelpers";
import {
  requestTypeLabels,
  statusLabels,
  type DecisionAction,
} from "@widgets/admin/requests/requests-config/libs/requestTypeConfig";
import {
  fallbackVisual,
  requestVisuals,
} from "@widgets/admin/requests/requests-config/libs/requestVisualConfig";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Bolt, Inbox } from "lucide-react";
import { useTranslation } from "react-i18next";
import styles from "../../requests-page-styles/AdminRequestsPage.module.scss";

interface RequestListProps {
  requests: AdminRequestListItem[];
  isLoading: boolean;
  isError: boolean;
  onOpenPreview: (request: AdminRequestListItem) => void;
  onDecide: (request: AdminRequestListItem, action: DecisionAction) => void;
}

export const RequestList = ({
  requests,
  isLoading,
  isError,
  onOpenPreview,
  onDecide,
}: RequestListProps) => {
  const { t } = useTranslation(["admin", "common"]);

  if (isLoading) {
    return (
      <div className={styles.requestsList}>
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className={styles.requestSkeleton} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.stateCard}>
        <strong>{t("admin:requests.states.errorTitle")}</strong>
        <span>{t("admin:requests.states.errorText")}</span>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className={styles.stateCard}>
        <Inbox size={34} aria-hidden="true" />
        <strong>{t("admin:requests.states.emptyTitle")}</strong>
        <span>{t("admin:requests.states.emptyText")}</span>
      </div>
    );
  }

  return (
    <div className={styles.requestsList}>
      <AnimatePresence initial={false}>
        {requests.map((request) => {
          const visual = requestVisuals[request.typeName] ?? fallbackVisual;
          const Icon = visual.icon;
          const hasDrawer = canOpenRequestDrawer(request);

          return (
            <motion.article
              key={request.id}
              className={`${styles.requestCard} ${
                hasDrawer ? styles.requestCardClickable : ""
              }`}
              style={{ boxShadow: `0 4px 18px ${visual.shadow}` }}
              onClick={() => {
                if (hasDrawer) {
                  onOpenPreview(request);
                }
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.18 }}
            >
              <span
                className={styles.requestAccent}
                style={{ background: visual.accent }}
                aria-hidden="true"
              />
              <div className={styles.requestBody}>
                <span
                  className={styles.requestIcon}
                  style={{ background: visual.bg, color: visual.color }}
                >
                  <Icon size={22} aria-hidden="true" />
                </span>

                <div className={styles.requestContent}>
                  <div className={styles.requestTitleRow}>
                    <h2 className={styles.requestTitle}>{request.title}</h2>
                    {request.priorityBoostApplied && (
                      <span className={styles.priorityPill}>
                        <Bolt size={13} aria-hidden="true" />
                        {t("admin:requests.metrics.priorityBoosted")}
                      </span>
                    )}
                  </div>
                  {request.description && (
                    <p className={styles.requestDescription}>
                      {request.description}
                    </p>
                  )}
                  <div className={styles.requestMeta}>
                    <span>{t(requestTypeLabels[request.typeName])}</span>
                    <span aria-hidden="true">-</span>
                    <span>{formatTimeAgo(request.createdAt, t)}</span>
                  </div>
                </div>

                <div className={styles.requestSide}>
                  <span
                    className={`${styles.statusPill} ${getStatusClassName(
                      request.statusName,
                    )}`}
                  >
                    {t(statusLabels[request.statusName])}
                  </span>
                  <RequestActions request={request} onDecide={onDecide} />
                  <button
                    type="button"
                    className={
                      hasDrawer
                        ? styles.expandButton
                        : styles.expandButtonDisabled
                    }
                    disabled={!hasDrawer}
                    onClick={(event) => {
                      event.stopPropagation();
                      if (hasDrawer) {
                        onOpenPreview(request);
                      }
                    }}
                    aria-label={t("admin:requests.drawer.open")}
                  >
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </motion.article>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
