import { useTranslation } from "react-i18next";
import styles from "./InviteVolunteerCard.module.scss";

interface InviteVolunteerCardProps {
  onBrowse: () => void;
  entityLabel?: string;
}

export const InviteVolunteerCard = ({
  onBrowse,
  entityLabel = "organization",
}: InviteVolunteerCardProps) => {
  const { t } = useTranslation("common");
  const entity = t(`member.entities.${entityLabel}`);

  return (
    <article
    className={styles.inviteCard}
    role="button"
    tabIndex={0}
    onClick={onBrowse}
    onKeyDown={(event) => {
      if (event.target !== event.currentTarget) return;
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onBrowse();
      }
    }}
  >
    <div className={styles.cardDeco} />
    <div className={styles.cardDecoSecondary} />

    <div className={styles.eyebrow}>
      <div className={styles.eyebrowLine} />
      <span className={styles.eyebrowText}>{t("inviteCard.eyebrow")}</span>
    </div>

    <div className={styles.cardBody}>
      <div className={styles.iconRow}>
        <div className={styles.iconChip}>
          <i className="ti ti-user-plus" aria-hidden="true" />
        </div>
        <div className={styles.iconChip}>
          <i className="ti ti-search" aria-hidden="true" />
        </div>
        <div className={styles.iconChip}>
          <i className="ti ti-users" aria-hidden="true" />
        </div>
      </div>

      <h3 className={styles.cardTitle}>{t("inviteCard.title")}</h3>
      <p className={styles.cardDesc}>{t("inviteCard.description", { entity })}</p>

      <button
        type="button"
        className={styles.inviteBtn}
        onClick={(event) => {
          event.stopPropagation();
          onBrowse();
        }}
      >
        <i className="ti ti-search" aria-hidden="true" />
        {t("inviteCard.cta")}
      </button>
    </div>
    </article>
  );
};
