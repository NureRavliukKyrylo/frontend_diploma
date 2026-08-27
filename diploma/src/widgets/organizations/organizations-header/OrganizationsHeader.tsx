import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { HeaderOrganization } from "@shared/assets/images/entity-information";
import styles from "./OrganizationsHeader.module.scss";

interface OrganizationHeaderProps {
  organizationsCount?: number;
}

export const OrganizationHeader = ({
  organizationsCount,
}: OrganizationHeaderProps) => {
  const { t } = useTranslation("organizations");

  return (
    <div className={styles.organizationListHeader}>
      <div className={styles.organizationsMainInfo}>
        <div className={styles.headerTextOrganizations}>
          <h1 className={styles.headerText}>{t("catalog.headerTitle")}</h1>
          <h1 className={styles.totalOrganizations}>
            {t("catalog.count", { count: organizationsCount ?? 0 })}
          </h1>
        </div>
        <div className={styles.bottomTextOrganizations}>
          <h1 className={styles.bottomText}>{t("catalog.headerText")}</h1>
          <h1 className={styles.joinedOrganizationsText}>
            {t("catalog.joinedPrompt")}{" "}
            <Link to="/activities/my" className={styles.toOrganizationsLink}>
              {t("catalog.joinedLink")}
            </Link>
          </h1>
        </div>
      </div>
      <div className={styles.organizationsMainInfoImage}>
        <img src={HeaderOrganization} alt={t("catalog.imageAlt")} />
      </div>
    </div>
  );
};
