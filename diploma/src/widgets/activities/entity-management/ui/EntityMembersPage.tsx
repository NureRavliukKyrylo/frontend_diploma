import type { EntityType } from "@shared/config/types";
import { EntityPageShell } from "./EntityPageShell";
import { EntityMembersPanel } from "./EntityMembersPanel";
import styles from "./EntityManagementPage.module.scss";

interface EntityMembersPageProps {
  entityType: EntityType;
  entityId: string;
  userId?: string;
  canManage: boolean;
  eyebrow: string;
  title: string;
  subtitle: string;
  backLabel: string;
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
  onBack: () => void;
}

export const EntityMembersPage = ({
  entityType,
  entityId,
  userId,
  canManage,
  eyebrow,
  title,
  subtitle,
  backLabel,
  labels,
  onBack,
}: EntityMembersPageProps) => (
  <EntityPageShell
    eyebrow={eyebrow}
    title={title}
    subtitle={subtitle}
    backLabel={backLabel}
    onBack={onBack}
  >
    <div className={styles.panel}>
      <EntityMembersPanel
        entityType={entityType}
        entityId={entityId}
        userId={userId}
        canManage={canManage}
        pageSize={24}
        labels={labels}
      />
    </div>
  </EntityPageShell>
);
