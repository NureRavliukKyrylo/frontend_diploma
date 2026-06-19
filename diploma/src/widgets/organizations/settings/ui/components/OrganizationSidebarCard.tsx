import styles from "../SettingsWidget.module.scss";

interface OrganizationSidebarCardProps {
  name: string;
  contactEmail?: string | null;
  currentLogoUrl?: string | null;
  initials: string;
}

export const OrganizationSidebarCard = ({
  name,
  contactEmail,
  currentLogoUrl,
  initials,
}: OrganizationSidebarCardProps) => (
  <aside className={styles.orgCard}>
    <div className={styles.orgLogo}>
      {currentLogoUrl ? (
        <img src={currentLogoUrl} alt={`${name} logo`} />
      ) : (
        <span>{initials}</span>
      )}
    </div>
    <h2 title={name}>{name}</h2>
    <p
      className={!contactEmail ? styles.emptyEmail : undefined}
      title={contactEmail || "Email not added yet"}
    >
      {contactEmail || "Email not added yet"}
    </p>
    <div className={styles.statusWrapper}>
      <span className={styles.statusBadge}>
        <span aria-hidden="true" />
        Active
      </span>
    </div>
  </aside>
);
