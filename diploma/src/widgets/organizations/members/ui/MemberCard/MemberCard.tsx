import { motion } from "framer-motion";
import type { OrganizationContextRole } from "@entities/organization";
import { useMemberRoleMenu } from "./lib/useMemberRoleMenu";
import type { OrganizationMemberCardModel } from "./types";
import { MemberCardFooter } from "./ui/MemberCardFooter";
import { MemberCardTop } from "./ui/MemberCardTop";
import { MemberStatsMeta } from "./ui/MemberStatsMeta";
import styles from "./MemberCard.module.scss";

interface MemberCardProps {
  member: OrganizationMemberCardModel;
  roles: OrganizationContextRole[];
  entityLabel?: string;
  isRoleChangePending?: boolean;
  onChangeRole: (member: OrganizationMemberCardModel, roleId: string) => void;
  onProfileClick: (member: OrganizationMemberCardModel) => void;
  onMessageClick: (member: OrganizationMemberCardModel) => void;
  onRemoveClick: (member: OrganizationMemberCardModel) => void;
}

export const MemberCard = ({
  member,
  roles,
  entityLabel = "organization",
  isRoleChangePending = false,
  onChangeRole,
  onProfileClick,
  onMessageClick,
  onRemoveClick,
}: MemberCardProps) => {
  const roleMenu = useMemberRoleMenu({
    roles,
    currentRoleId: member.roleId,
    onSelectRole: (roleId) => onChangeRole(member, roleId),
  });
  const showRoleSection =
    Boolean(member.participationId) && roleMenu.hasAvailableRoles;

  return (
    <motion.article
      className={styles.memberCard}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <MemberCardTop member={member} />
      <MemberStatsMeta member={member} />
      <MemberCardFooter
        member={member}
        roleMenu={roleMenu}
        isRoleChangePending={isRoleChangePending}
        showRoleSection={showRoleSection}
        entityLabel={entityLabel}
        onProfileClick={onProfileClick}
        onMessageClick={onMessageClick}
        onRemoveClick={onRemoveClick}
      />
    </motion.article>
  );
};

export type { OrganizationMemberCardModel };
