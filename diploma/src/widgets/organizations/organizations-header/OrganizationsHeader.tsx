import { Link } from "@tanstack/react-router";
import styles from "./OrganizationsHeader.module.scss";
import { HeaderOrganization } from "@shared/assets/images/entity-information";

interface OrganizationHeaderProps {
  organizationsCount?: number;
}

export const OrganizationHeader = ({
  organizationsCount,
}: OrganizationHeaderProps) => {
  return (
    <div className={styles.organizationListHeader}>
      <div className={styles.organizationsMainInfo}>
        <div className={styles.headerTextOrganizations}>
          <h1 className={styles.headerText}>
            Find people and causes you truly want to support
          </h1>
          <h1 className={styles.totalOrganizations}>
            {organizationsCount} organizations
          </h1>
        </div>
        <div className={styles.bottomTextOrganizations}>
          <h1 className={styles.bottomText}>
            Every organization here is working to help real people, respond to
            real needs, and create meaningful change. Explore their mission,
            learn what they need right now, and find the place where your time,
            skills, or support can truly matter.
          </h1>
          <h1 className={styles.joinedOrganizationsText}>
            Want to see the organizations you’ve already joined?{" "}
            <Link to="/projects/my" className={styles.toOrganizationsLink}>
              Click
            </Link>
          </h1>
        </div>
      </div>
      <div className={styles.organizationsMainInfoImage}>
        <img src={HeaderOrganization} alt="header-organization" />
      </div>
    </div>
  );
};
