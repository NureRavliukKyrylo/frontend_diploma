import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { EmptyState } from "@shared/ui";
import { InviteVolunteerCard, MemberCard } from "@widgets/organizations/members";
import type { OrganizationMembersPageModel } from "../../model/types";
import styles from "./MembersContent.module.scss";

interface MembersGridProps {
  model: OrganizationMembersPageModel;
  hasSearch: boolean;
}

export const MembersGrid = ({ model, hasSearch }: MembersGridProps) => {
  const { t } = useTranslation("common");
  const entity = t(`member.entities.${model.entityLabel}`);
  const emptyCopy = hasSearch
    ? {
        title: t("memberList.noMembersFound"),
        subtitle: t("memberList.noMembersFoundHint"),
      }
    : {
        title: t("memberList.noMembers"),
        subtitle: t("memberList.noMembersHint", { entity }),
      };
  const shouldRenderGrid = model.filteredMembers.length > 0 || !hasSearch;

  if (!shouldRenderGrid) {
    return <EmptyState title={emptyCopy.title} subtitle={emptyCopy.subtitle} />;
  }

  return (
    <div className={styles.cardsGrid}>
      {model.filteredMembers.map((member, index) => (
        <motion.div
          key={member.userId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.3, ease: "easeOut" }}
        >
          <MemberCard
            member={member}
            roles={model.roles}
            entityLabel={model.entityLabel}
            isRoleChangePending={
              model.activeRoleChangeParticipationId === member.participationId
            }
            onChangeRole={(nextMember, roleId) =>
              model.roleChangeMutation.mutate({ member: nextMember, roleId })
            }
            onProfileClick={model.handleProfileClick}
            onMessageClick={model.handleMessageClick}
            onRemoveClick={model.setMemberToRemove}
          />
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: model.filteredMembers.length * 0.05,
          duration: 0.3,
          ease: "easeOut",
        }}
      >
        <InviteVolunteerCard
          entityLabel={model.entityLabel}
          onBrowse={model.handleBrowseVolunteers}
        />
      </motion.div>
    </div>
  );
};
