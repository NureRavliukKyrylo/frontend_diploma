import { ChevronLeft, Plus } from "lucide-react";
import { getOrganizationInitials } from "../../lib/roleViewModels";
import type { OrganizationRolesPageModel } from "../../model/pageModel";
import styles from "./RolesTopBar.module.scss";

interface RolesTopBarProps {
  model: OrganizationRolesPageModel;
}

export const RolesTopBar = ({ model }: RolesTopBarProps) => (
  <div className={styles.topBar}>
    <div className={styles.titleGroup}>
      <button
        type="button"
        className={styles.backButton}
        aria-label="Back to organization"
        onClick={() =>
          model.navigate({
            to: "/organizations/$id",
            params: { id: model.organizationId },
          })
        }
      >
        <ChevronLeft size={20} strokeWidth={2.4} />
      </button>

      <span className={styles.orgLogo}>
        {model.organization?.logoUrl ? (
          <img
            src={model.organization.logoUrl}
            alt={`${model.organization.name} logo`}
          />
        ) : (
          <span>{getOrganizationInitials(model.organization?.name ?? "")}</span>
        )}
      </span>
      <span className={styles.verticalLine} />

      <div className={styles.titleCopy}>
        <span className={styles.organizationCaption}>
          {model.organization?.name}
        </span>
        <h1 className={styles.pageTitle}>Roles</h1>
      </div>
    </div>

    <button
      type="button"
      className={styles.newRoleButton}
      onClick={() => model.setFormState({ mode: "create", role: null })}
    >
      <Plus size={15} strokeWidth={2.4} />
      New role
    </button>
  </div>
);
