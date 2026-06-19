import styles from "./InviteVolunteerCard.module.scss";

interface InviteVolunteerCardProps {
  onBrowse: () => void;
}

export const InviteVolunteerCard = ({ onBrowse }: InviteVolunteerCardProps) => (
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
      <span className={styles.eyebrowText}>Grow your team</span>
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

      <h3 className={styles.cardTitle}>Invite a volunteer</h3>
      <p className={styles.cardDesc}>
        Browse the volunteer directory and invite new members to this
        organization.
      </p>

      <button
        type="button"
        className={styles.inviteBtn}
        onClick={(event) => {
          event.stopPropagation();
          onBrowse();
        }}
      >
        <i className="ti ti-search" aria-hidden="true" />
        Browse volunteers
      </button>
    </div>
  </article>
);
