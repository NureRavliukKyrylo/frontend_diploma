import { motion } from "framer-motion";
import { Clock3, LogIn, LogOut } from "lucide-react";
import { Avatar } from "@shared/ui";
import { Stars } from "@shared/ui/stars";
import { formatTimeAgo } from "@shared/libs/date";
import { useTranslation } from "react-i18next";
import styles from "./RequestCard.module.scss";

export interface OrganizationRequestCardModel {
  id: string;
  userId: string;
  kind: "join" | "leave";
  fullName: string;
  avatarUrl?: string | null;
  level?: number | null;
  rating?: number | null;
  ratingCount?: number | null;
  totalHours?: number | null;
  primaryStatValue: string;
  primaryStatLabel: string;
  secondaryStatValue: string;
  secondaryStatLabel: string;
  submittedAt: string;
}

interface RequestCardProps {
  request: OrganizationRequestCardModel;
  isPending?: boolean;
  onApprove: (request: OrganizationRequestCardModel) => void;
  onReject: (request: OrganizationRequestCardModel) => void;
}

const requestMeta = {
  join: {
    className: styles.requestJoin,
    icon: LogIn,
    labelKey: "member.requestJoin",
  },
  leave: {
    className: styles.requestLeave,
    icon: LogOut,
    labelKey: "member.requestLeave",
  },
} as const;

export const RequestCard = ({
  request,
  isPending = false,
  onApprove,
  onReject,
}: RequestCardProps) => {
  const { t } = useTranslation("common");
  const meta = requestMeta[request.kind];
  const MetaIcon = meta.icon;

  return (
    <article className={styles.requestCard}>
      <div className={styles.cardTop}>
        <div className={styles.avatarWrapper}>
          <Avatar
            src={request.avatarUrl ?? undefined}
            fallback={request.fullName}
            variant={request.avatarUrl ? "default" : "initials"}
            className={styles.avatar}
            initialsClassName={styles.avatarInitials}
          />
          {typeof request.level === "number" ? (
            <span className={styles.levelBadge}>
              {t("member.level", { level: request.level })}
            </span>
          ) : null}
        </div>

        <h3 className={styles.name}>{request.fullName}</h3>

        <div className={styles.ratingRow}>
          <Stars
            value={request.rating ?? 0}
            className={styles.stars}
            classNameStar={styles.starIcon}
          />
          <span className={styles.ratingValue}>
            {(request.rating ?? 0).toFixed(1)}
          </span>
          <span className={styles.ratingCount}>
            ({request.ratingCount ?? 0})
          </span>
        </div>

        {typeof request.totalHours === "number" ? (
          <span className={styles.timeBankPill}>
            <Clock3 size={13} strokeWidth={2.2} />
            {t("member.hours", { hours: request.totalHours.toFixed(1) })}
          </span>
        ) : null}
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statBlock}>
          <strong>{request.primaryStatValue}</strong>
          <span>{t("member.completedProjects")}</span>
        </div>
        <div className={styles.statBlock}>
          <strong>{request.secondaryStatValue}</strong>
          <span>{t("member.activeProjects")}</span>
        </div>
      </div>

      <div className={styles.metaSection}>
        <span className={`${styles.requestBadge} ${meta.className}`}>
          <MetaIcon size={13} strokeWidth={2.2} />
          {t(meta.labelKey)}
        </span>
        <span className={styles.metaDate}>
          {formatTimeAgo(request.submittedAt, t)}
        </span>
      </div>

      <div className={styles.footer}>
        <motion.button
          type="button"
          className={styles.rejectBtn}
          disabled={isPending}
          whileTap={{ scale: 0.96 }}
          onClick={() => onReject(request)}
        >
          {t("actions.reject")}
        </motion.button>
        <motion.button
          type="button"
          className={styles.approveBtn}
          disabled={isPending}
          whileTap={{ scale: 0.96 }}
          onClick={() => onApprove(request)}
        >
          {t("actions.approve")}
        </motion.button>
      </div>
    </article>
  );
};
