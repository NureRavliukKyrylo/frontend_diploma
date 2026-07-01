import { formatAdminDate } from "@entities/admin";
import { Copy, RotateCcw } from "lucide-react";
import type { AdminBansStyles, BanDisplay } from "../model/types";
import { getInitials, getUserName, shortId } from "../lib/banDisplay";
import { useTranslation } from "react-i18next";

interface BanCardProps {
  styles: AdminBansStyles;
  item: BanDisplay;
  onRevoke: (item: BanDisplay) => void;
}

export const BanCard = ({ styles, item, onRevoke }: BanCardProps) => {
  const { t } = useTranslation("admin");
  const Icon = item.icon;
  const targetName = getUserName(item.user, item.ban.userId);
  const creatorName = getUserName(item.creator, item.ban.createdByUserId);

  return (
    <article
      key={item.ban.id}
      className={`${styles.banCard} ${styles[`banCard_${item.tone}`]}`}
    >
      <span className={styles.cardDeco} aria-hidden="true" />
      <div className={styles.banCardHeader}>
        {item.user ? (
          <span className={styles.avatar}>
            {item.user.avatarUrl ? (
              <img src={item.user.avatarUrl} alt={targetName} />
            ) : (
              getInitials(item.user)
            )}
          </span>
        ) : (
          <span className={styles.banCardIconWrap}>
            <Icon size={22} aria-hidden="true" />
          </span>
        )}

        <div className={styles.banCardIdentity}>
          <span className={styles.banCardUserName}>{targetName}</span>
          <button
            type="button"
            className={styles.banCardUserId}
            onClick={() => navigator.clipboard?.writeText(item.ban.userId)}
          >
            <Copy size={13} aria-hidden="true" />
            {shortId(item.ban.userId)}
          </button>
        </div>

        <span
          className={`${styles.statusPill} ${styles[`statusPill_${item.tone}`]}`}
        >
          {item.statusLabel}
        </span>
      </div>

      <p className={styles.banCardReason}>
        {item.ban.reason || t("bans.card.noReason")}
      </p>

      <div className={styles.banCardMetaGrid}>
        <span>
          <small>{t("bans.card.bannedBy")}</small>
          <strong>{creatorName || shortId(item.ban.createdByUserId)}</strong>
        </span>
        <span>
          <small>{t("bans.card.issued")}</small>
          <strong>{formatAdminDate(item.ban.createdAt)}</strong>
        </span>
      </div>

      <button
        type="button"
        className={styles.revokeButton}
        onClick={() => onRevoke(item)}
      >
        <RotateCcw size={16} aria-hidden="true" />
        {t("bans.card.revoke")}
      </button>
    </article>
  );
};
