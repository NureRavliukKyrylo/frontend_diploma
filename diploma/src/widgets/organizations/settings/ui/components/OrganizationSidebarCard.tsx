import { useTranslation } from "react-i18next";
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
}: OrganizationSidebarCardProps) => {
  const { t } = useTranslation("organizations");

  return (
    <aside className={styles.orgCard}>
    <div className={styles.orgLogo}>
      {currentLogoUrl ? (
        <img
          src={currentLogoUrl}
          alt={t("settings.general.logoAlt", { name })}
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
    <h2 title={name}>{name}</h2>
    <p
      className={!contactEmail ? styles.emptyEmail : undefined}
      title={contactEmail || t("settings.sidebar.emailMissing")}
    >
      {contactEmail || t("settings.sidebar.emailMissing")}
    </p>
    <div className={styles.statusWrapper}>
      <span className={styles.statusBadge}>
        <span aria-hidden="true" />
        {t("settings.sidebar.active")}
      </span>
    </div>
    </aside>
  );
};
