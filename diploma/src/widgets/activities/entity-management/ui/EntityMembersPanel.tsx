import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  participationQuery,
  type ParticipationListItem,
} from "@entities/participation";
import {
  getContextRolesForEntity,
  type OrganizationContextRole,
} from "@entities/organization";
import type { EntityType } from "@shared/config/types";
import { ConfirmationModal } from "@shared/ui/modals";
import {
  MemberCard,
  type OrganizationMemberCardModel,
} from "@widgets/organizations/members";
import { useEntityMemberMutations } from "../model/useEntityMemberMutations";
import { ActivityMembersTab } from "../../tabs/members-tab/ui/ActivityMembersTab";
import styles from "./EntityManagementPage.module.scss";

interface EntityMembersPanelProps {
  entityType: EntityType;
  entityId: string;
  userId?: string;
  canManage: boolean;
  pageSize?: number;
  labels: {
    loading: string;
    error: string;
    empty: string;
    confirmRemoveTitle: string;
    confirmRemoveText: string;
    confirmRemove: string;
    cancel: string;
    roleUpdated: string;
    roleUpdateFailed: string;
    memberRemoved: string;
    memberRemoveFailed: string;
    missingParticipation: string;
  };
}

const getFullName = (member: ParticipationListItem) =>
  [member.firstName, member.lastName].filter(Boolean).join(" ").trim() ||
  "Team member";

const formatJoinedLabel = (member: ParticipationListItem) => {
  const [joinedAt] = [...(member.joinDates ?? [])].sort(
    (left, right) => new Date(left).getTime() - new Date(right).getTime(),
  );

  if (!joinedAt) return null;
  const date = new Date(joinedAt);
  if (Number.isNaN(date.getTime())) return null;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const toMemberCard = (
  member: ParticipationListItem,
): OrganizationMemberCardModel => ({
  userId: member.userId,
  participationId: member.id,
  fullName: getFullName(member),
  avatarUrl: member.avatarUrl || null,
  isOwner: false,
  roleId: member.role?.roleId ?? null,
  roleName: member.role?.name || "Volunteer",
  level: null,
  rating: 0,
  ratingCount: 0,
  totalHours: null,
  primaryStatValue: member.isActive ? "Active" : "Inactive",
  primaryStatLabel: "Status",
  secondaryStatValue: formatJoinedLabel(member) ?? "—",
  secondaryStatLabel: "Joined",
  joinedAtLabel: null,
});

export const EntityMembersPanel = ({
  entityType,
  entityId,
  userId,
  canManage,
  pageSize = 48,
  labels,
}: EntityMembersPanelProps) => {
  const mutations = useEntityMemberMutations({
    entityType,
    entityId,
    labels,
  });
  const membersResult = useQuery(
    participationQuery.members({
      entityType,
      entityId,
      page: 1,
      pageSize,
    }),
  );
  const rolesResult = useQuery({
    queryKey: ["context-roles", entityType, entityId, "members-panel"],
    queryFn: () => getContextRolesForEntity(entityType, entityId, false),
    enabled: canManage,
  });
  const members = useMemo(
    () => (membersResult.data?.data ?? []).map(toMemberCard),
    [membersResult.data?.data],
  );
  const roles = (rolesResult.data ?? []) as OrganizationContextRole[];

  if (!canManage) {
    return (
      <ActivityMembersTab
        entityType={entityType}
        entityId={entityId}
        userId={userId}
        PageSize={pageSize}
      />
    );
  }

  if (membersResult.isPending || rolesResult.isPending) {
    return <div className={styles.statePanel}>{labels.loading}</div>;
  }

  if (membersResult.isError || rolesResult.isError) {
    return <div className={styles.statePanel}>{labels.error}</div>;
  }

  if (members.length === 0) {
    return <div className={styles.statePanel}>{labels.empty}</div>;
  }

  return (
    <>
      <div className={styles.membersGrid}>
        {members.map((member) => (
          <MemberCard
            key={member.userId}
            member={member}
            roles={roles}
            isRoleChangePending={
              mutations.activeRoleChangeParticipationId ===
              member.participationId
            }
            onChangeRole={(nextMember, roleId) =>
              mutations.roleChangeMutation.mutate({
                member: nextMember,
                roleId,
              })
            }
            onProfileClick={() => undefined}
            onMessageClick={() => undefined}
            onRemoveClick={mutations.setMemberToRemove}
          />
        ))}
      </div>

      <ConfirmationModal
        isOpen={Boolean(mutations.memberToRemove)}
        title={labels.confirmRemoveTitle}
        text={labels.confirmRemoveText}
        confirmText={labels.confirmRemove}
        cancelText={labels.cancel}
        isLoading={mutations.removalMutation.isPending}
        onConfirm={() => {
          if (mutations.memberToRemove) {
            mutations.removalMutation.mutate(mutations.memberToRemove);
          }
        }}
        onCancel={() => mutations.setMemberToRemove(null)}
      />
    </>
  );
};
