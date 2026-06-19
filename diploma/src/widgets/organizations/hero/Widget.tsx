import { IconArchive, IconSearch } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { OrganizationsMapImage } from "@shared/assets/images/information";
import { LinkButtonWrapper } from "@shared/ui/buttons";
import styles from "./Widget.module.scss";

interface OrganizationsHeroWidgetProps {
  archivedCount?: number;
}

export const OrganizationsHeroWidget = ({
  archivedCount = 0,
}: OrganizationsHeroWidgetProps) => {
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
          <span className={styles.eyebrowText}>Your Space</span>
        </div>
        <h1 className={styles.heading}>My organizations</h1>
        <h2 className={styles.subheading}>
          Where volunteer initiatives are created and coordinated
        </h2>
        <p className={styles.description}>
          Here you'll find all the organizations you've joined or created. Open
          any organization to explore its active projects, track upcoming
          events, and see how your contributions add up over time. Stay
          connected with your team, coordinate tasks together, and keep an eye
          on your progress as you level up within each community.
        </p>
        <div className={styles.heroActions}>
          <LinkButtonWrapper to="/organizations" className={styles.heroBtn}>
            <IconSearch size={16} stroke={2.2} />
            Browse organizations
          </LinkButtonWrapper>

          {archivedCount > 0 && (
            <LinkButtonWrapper
              to="/organizations/archived"
              className={styles.archiveBtn}
            >
              <IconArchive size={16} stroke={2.2} />
              Archived
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
