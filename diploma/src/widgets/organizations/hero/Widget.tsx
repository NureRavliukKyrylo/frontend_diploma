import { IconArchive, IconSearch } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { OrganizationsMapImage } from "@shared/assets/images/information";
import { LinkButtonWrapper } from "@shared/ui/buttons";
import styles from "./Widget.module.scss";

interface OrganizationsHeroWidgetProps {
  archivedCount?: number;
}

export const OrganizationsHeroWidget = ({
  archivedCount = 0,
}: OrganizationsHeroWidgetProps) => {
  const { t } = useTranslation("organizations");
  return (
    <motion.section
      className={styles.hero}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.heroLeft}>
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowLine} />
          <span className={styles.eyebrowText}>
            {t("catalog.eyebrow")}
          </span>
        </div>
        <h1 className={styles.heading}>{t("catalog.title")}</h1>
        <h2 className={styles.subheading}>
          {t("catalog.subtitle")}
        </h2>
        <p className={styles.description}>
          {t("catalog.description")}
        </p>
        <div className={styles.heroActions}>
          <LinkButtonWrapper to="/organizations" className={styles.heroBtn}>
            <IconSearch size={16} stroke={2.2} />
            {t("catalog.browse")}
          </LinkButtonWrapper>

          {archivedCount > 0 && (
            <LinkButtonWrapper
              to="/organizations/archived"
              className={styles.archiveBtn}
            >
              <IconArchive size={16} stroke={2.2} />
              {t("catalog.archived")}
              <span className={styles.archiveBadge}>{archivedCount}</span>
            </LinkButtonWrapper>
          )}
        </div>
      </div>

      <div className={styles.heroDeco}>
        <img src={OrganizationsMapImage} alt="" />
      </div>
    </motion.section>
  );
};
