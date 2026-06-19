import type { Organization } from "../../../model/types";
import { AvatarGroup } from "@shared/ui";
import styles from "./OrganizationCard.module.scss";
import { OrganizationCardBase } from "../base/OrganizationCardBase";
import { memberPreviewToAvatar } from "@entities/user";

interface OrganizationCardProps {
  organization: Organization;
}

export const OrganizationCard = ({ organization }: OrganizationCardProps) => (
  <div className={styles.organizationCardWrapper}>
    <OrganizationCardBase
      organization={organization}
      bottomContent={
        <div className={styles.footerContent}>
          {organization.memberPreviews?.length ? (
            <AvatarGroup
              className={styles.avatarsGroup}
              avatarClassName={styles.avatarVolunteer}
              remainingClassName={styles.remainingAvatarItem}
              avatars={organization.memberPreviews.map(memberPreviewToAvatar)}
              maxItems={3}
            />
          ) : (
            <p className={styles.noMembers}>No volunteers joined yet</p>
          )}
        </div>
      }
    />
  </div>
);
