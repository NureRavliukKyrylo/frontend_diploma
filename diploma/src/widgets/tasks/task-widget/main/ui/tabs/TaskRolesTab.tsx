import { useQuery } from "@tanstack/react-query";
import type { Task } from "@entities/task";
import { getContextRolesForEntity } from "@entities/organization";
import { RoleCard } from "@widgets/organizations/roles";
import styles from "./TaskTabs.module.scss";

interface TaskRolesTabProps {
  task: Task;
  labels: {
    loading: string;
    error: string;
    empty: string;
  };
}

export const TaskRolesTab = ({ task, labels }: TaskRolesTabProps) => {
  const rolesResult = useQuery({
    queryKey: ["context-roles", "task", task.id],
    queryFn: () => getContextRolesForEntity("task", task.id),
  });
  const roles = rolesResult.data ?? [];

  if (rolesResult.isPending) {
    return <div className={styles.statePanel}>{labels.loading}</div>;
  }

  if (rolesResult.isError) {
    return <div className={styles.statePanel}>{labels.error}</div>;
  }

  if (roles.length === 0) {
    return <div className={styles.statePanel}>{labels.empty}</div>;
  }

  return (
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
  );
};
