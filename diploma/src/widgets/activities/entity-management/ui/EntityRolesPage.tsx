import { useQuery } from "@tanstack/react-query";
import type { EntityType } from "@shared/config/types";
import { getContextRolesForEntity } from "@entities/organization";
import { RoleCard } from "@widgets/organizations/roles";
import { EntityPageShell } from "./EntityPageShell";
import styles from "./EntityManagementPage.module.scss";

interface EntityRolesPageProps {
  entityType: EntityType;
  entityId: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  backLabel: string;
  loadingLabel: string;
  errorLabel: string;
  emptyLabel: string;
  onBack: () => void;
}

export const EntityRolesPage = ({
  entityType,
  entityId,
  eyebrow,
  title,
  subtitle,
  backLabel,
  loadingLabel,
  errorLabel,
  emptyLabel,
  onBack,
}: EntityRolesPageProps) => {
  const rolesResult = useQuery({
    queryKey: ["context-roles", entityType, entityId],
    queryFn: () => getContextRolesForEntity(entityType, entityId),
  });

  const roles = rolesResult.data ?? [];

  return (
    <EntityPageShell
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      backLabel={backLabel}
      onBack={onBack}
    >
      {rolesResult.isPending ? (
        <div className={styles.statePanel}>{loadingLabel}</div>
      ) : null}

      {rolesResult.isError ? (
        <div className={styles.statePanel}>{errorLabel}</div>
      ) : null}

      {!rolesResult.isPending && !rolesResult.isError && roles.length === 0 ? (
        <div className={styles.statePanel}>{emptyLabel}</div>
      ) : null}

      {!rolesResult.isPending && !rolesResult.isError && roles.length > 0 ? (
        <div className={styles.rolesGrid}>
          {roles.map((role, index) => (
            <RoleCard
              key={role.id}
              role={role}
              index={index}
              type={role.isSystemGenerated ? "system" : "custom"}
              onClick={() => undefined}
            />
          ))}
        </div>
      ) : null}
    </EntityPageShell>
  );
};
