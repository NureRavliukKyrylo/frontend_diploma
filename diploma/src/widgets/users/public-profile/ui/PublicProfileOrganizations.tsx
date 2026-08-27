import { Building2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { PublicProfileOrganization } from "@entities/user/profile";
import { Avatar } from "@shared/ui/avatar/avatar-base/Avatar";
import { ProfileSectionCard } from "./ProfileSectionCard";
import styles from "./PublicProfileOrganizations.module.scss";

export const PublicProfileOrganizations = ({
  organizations,
}: {
  organizations: PublicProfileOrganization[];
}) => {
  const { t } = useTranslation("common");

  return (
    <ProfileSectionCard
      title={t("publicProfile.sections.organizations")}
      meta={`${organizations.length}`}
    >
    {organizations.length > 0 ? (
      <div className={styles.list}>
        {organizations.map((organization) => (
          <div key={organization.organizationId} className={styles.organization}>
            {organization.logoUrl ? (
              <Avatar
                src={organization.logoUrl}
                fallback={organization.name}
                className={styles.avatar}
              />
            ) : (
              <span className={styles.fallback}>
                <Building2 size={18} />
              </span>
            )}
            <span className={styles.name}>{organization.name}</span>
            {organization.roleName && (
              <span className={styles.role}>{organization.roleName}</span>
            )}
          </div>
        ))}
      </div>
    ) : (
      <p className={styles.empty}>{t("publicProfile.organizations.empty")}</p>
    )}
    </ProfileSectionCard>
  );
};
