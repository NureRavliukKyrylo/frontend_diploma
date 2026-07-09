import {
  BadgeCard,
  TierColors,
  badgesQuery,
  type AdminBadgeListItem,
} from "@entities/badge";
import { formatAdminDate } from "@entities/admin";
import { Skeleton } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import {
  Archive,
  CalendarDays,
  Medal,
  Pencil,
  RotateCcw,
  Settings2,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { getMetricLabel, getScopeLabel } from "../../lib/badgeAdminOptions";
import { toBadgeCardModel } from "../../lib/badgeCardAdapter";
import styles from "./BadgeViewDrawer.module.scss";
import { useTranslation } from "react-i18next";

interface BadgeViewDrawerProps {
  badge: AdminBadgeListItem | null;
  onClose: () => void;
  onEdit: (badge: AdminBadgeListItem) => void;
  onChangeIcon: (badge: AdminBadgeListItem) => void;
  onArchive: (badge: AdminBadgeListItem) => void;
  onRecover: (badge: AdminBadgeListItem) => void;
  onDelete: (badge: AdminBadgeListItem) => void;
}

export const BadgeViewDrawer = ({
  badge,
  onClose,
  onEdit,
  onChangeIcon,
  onArchive,
  onRecover,
  onDelete,
}: BadgeViewDrawerProps) => {
  const { t } = useTranslation("admin");
  const detailsQuery = useQuery({
    ...badgesQuery.adminDetails(badge?.id ?? ""),
    enabled: Boolean(badge?.id),
  });
  const requestsQuery = useQuery({
    ...badgesQuery.adminRequests(badge?.id ?? ""),
    enabled: Boolean(badge?.id && (detailsQuery.data ?? badge)?.isRequestable),
  });

  if (!badge) {
    return null;
  }

  const details = detailsQuery.data;
  const activeBadge = details ?? badge;
  const awardedText =
    activeBadge.awardedCountTotal > 0
      ? t("badges.drawer.awardedTimes", {
          count: activeBadge.awardedCountTotal,
        })
      : t("badges.drawer.notAwarded");

  return (
    <div className={styles.drawerBackdrop} onClick={onClose}>
      <aside
        className={styles.drawer}
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className={styles.drawerStripe}
          style={{ background: TierColors[activeBadge.rank.name] }}
        />

        <div className={styles.drawerHeader}>
          <div>
            <div className={styles.drawerEyebrow}>{t("badges.drawer.title")}</div>
            <h2>{activeBadge.title}</h2>
          </div>
          <button
            type="button"
            className={styles.drawerClose}
            onClick={onClose}
            aria-label={t("badges.drawer.close")}
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className={styles.drawerBody}>
          <div className={styles.posterHero}>
            <BadgeCard badge={toBadgeCardModel(activeBadge)} />
          </div>

          <div className={styles.rankRow}>
            <span
              className={styles.rankPill}
              style={{
                color: TierColors[activeBadge.rank.name],
                borderColor: TierColors[activeBadge.rank.name],
              }}
            >
              {t("badges.card.rank", { rank: activeBadge.rank.name })}
            </span>
            <span
              className={
                activeBadge.isArchived ? styles.statusMuted : styles.statusLive
              }
            >
              {activeBadge.isArchived
                ? t("badges.card.archived")
                : t("badges.card.active")}
            </span>
          </div>

          {detailsQuery.isLoading ? (
            <Skeleton className={styles.detailsSkeleton} />
          ) : (
            <>
              <section className={styles.section}>
                <div className={styles.sectionLabel}>
                  {t("badges.drawer.description")}
                </div>
                <p className={styles.description}>
                  {details?.description || t("badges.drawer.noDescription")}
                </p>
              </section>

              <div className={styles.statsGrid}>
                <div className={styles.statTile}>
                  <Medal size={20} aria-hidden="true" />
                  <strong>{activeBadge.awardedCountTotal}</strong>
                  <span>{awardedText}</span>
                </div>
                <div className={styles.statTile}>
                  <CalendarDays size={20} aria-hidden="true" />
                  <strong>
                    {activeBadge.firstAwardedAt
                      ? formatAdminDate(activeBadge.firstAwardedAt)
                      : t("common.notProvided")}
                  </strong>
                  <span>{t("badges.drawer.firstAwarded")}</span>
                </div>
              </div>

              <section className={styles.section}>
                <div className={styles.sectionLabel}>
                  {t("badges.drawer.meta")}
                </div>
                <div className={styles.metaGrid}>
                  <div className={styles.metaCard}>
                    <span>{t("badges.drawer.scope")}</span>
                    <strong>
                      {activeBadge.entity?.title ||
                        getScopeLabel(activeBadge.scopeEntityType, t)}
                    </strong>
                  </div>
                  <div className={styles.metaCard}>
                    <span>{t("badges.drawer.requestable")}</span>
                    <strong>
                      {activeBadge.isRequestable
                        ? t("badges.drawer.enabled")
                        : t("badges.drawer.disabled")}
                    </strong>
                  </div>
                  <div className={styles.metaCard}>
                    <span>{t("badges.drawer.autoAward")}</span>
                    <strong>
                      {activeBadge.autoAwardEnabled
                        ? t("badges.drawer.enabled")
                        : t("badges.drawer.disabled")}
                    </strong>
                  </div>
                  <div className={styles.metaCard}>
                    <span>{t("badges.drawer.availableNow")}</span>
                    <strong>
                      {activeBadge.isAvailableNow
                        ? t("badges.drawer.available")
                        : t("badges.drawer.unavailable")}
                    </strong>
                  </div>
                </div>
              </section>

              <section className={styles.section}>
                <div className={styles.sectionLabel}>
                  {t("badges.drawer.availability")}
                </div>
                <div className={styles.availabilityRow}>
                  <span>
                    {details?.availableFromUtc
                      ? formatAdminDate(details.availableFromUtc)
                      : t("common.notProvided")}
                  </span>
                  <span>
                    {details?.availableToUtc
                      ? formatAdminDate(details.availableToUtc)
                      : t("common.notProvided")}
                  </span>
                </div>
              </section>

              <section className={styles.section}>
                <div className={styles.sectionLabel}>
                  {t("badges.drawer.rules")}
                </div>
                {activeBadge.ruleProgress.length ? (
                  <div className={styles.rulesList}>
                    {activeBadge.ruleProgress.map((rule, index) => (
                      <div
                        key={`${rule.metric}-${rule.label}-${index}`}
                        className={styles.ruleCard}
                        style={{ borderColor: TierColors[activeBadge.rank.name] }}
                      >
                        <Settings2 size={17} aria-hidden="true" />
                        <div>
                          <strong>{rule.label || getMetricLabel(rule.metric, t)}</strong>
                          <span>
                            {getMetricLabel(rule.metric, t)} · {rule.threshold}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.emptyState}>
                    {t("badges.drawer.noRules")}
                  </div>
                )}
              </section>

              {activeBadge.isRequestable && (
                <section className={styles.section}>
                  <div className={styles.sectionLabel}>
                    {t("badges.drawer.requests")}
                  </div>
                  {requestsQuery.isLoading ? (
                    <Skeleton className={styles.requestsSkeleton} />
                  ) : requestsQuery.isError ? (
                    <div className={styles.emptyState}>
                      {t("badges.drawer.requestsError")}
                    </div>
                  ) : requestsQuery.data?.data.length ? (
                    <div className={styles.requestList}>
                      {requestsQuery.data.data.slice(0, 4).map((request) => (
                        <div key={request.id} className={styles.requestRow}>
                          <Sparkles size={15} aria-hidden="true" />
                          <span>{request.title || request.userId}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className={styles.emptyState}>
                      {t("badges.drawer.noRequests")}
                    </div>
                  )}
                </section>
              )}
            </>
          )}
        </div>

        <div className={styles.drawerFooter}>
          <button
            type="button"
            className={styles.deleteButton}
            onClick={() => onDelete(badge)}
          >
            <Trash2 size={17} aria-hidden="true" />
            {t("badges.drawer.delete")}
          </button>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() =>
              activeBadge.isArchived ? onRecover(badge) : onArchive(badge)
            }
          >
            {activeBadge.isArchived ? (
              <RotateCcw size={17} aria-hidden="true" />
            ) : (
              <Archive size={17} aria-hidden="true" />
            )}
            {activeBadge.isArchived
              ? t("badges.drawer.recover")
              : t("badges.drawer.archive")}
          </button>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => onChangeIcon(badge)}
          >
            <Sparkles size={17} aria-hidden="true" />
            {t("badges.drawer.changeIcon")}
          </button>
          <button
            type="button"
            className={styles.editButton}
            onClick={() => onEdit(badge)}
          >
            <Pencil size={17} aria-hidden="true" />
            {t("badges.drawer.edit")}
          </button>
        </div>
      </aside>
    </div>
  );
};
