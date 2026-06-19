import { Link } from "@tanstack/react-router";
import {
  IconCalendarPlus,
  IconChecklist,
  IconFolderPlus,
  IconShieldCog,
  IconUsersPlus,
} from "@tabler/icons-react";
import type { OrganizationCreateResult } from "@features/organization/create-form";
import commonStyles from "../Common.module.scss";
import { GetStartedChecklistItem } from "./GetStartedChecklistItem";
import styles from "./GetStartedStep.module.scss";

interface OrganizationCreateGetStartedStepProps {
  organization: OrganizationCreateResult;
  onComplete: () => void;
}

export const OrganizationCreateGetStartedStep = ({
  organization,
  onComplete,
}: OrganizationCreateGetStartedStepProps) => {
  const params = { id: organization.id };

  return (
    <div className={commonStyles.formShell}>
      <div className={commonStyles.card}>
        <div className={commonStyles.cardDeco} />
        <h2 className={commonStyles.cardHeading}>
          Welcome to {organization.name}
        </h2>
        <p className={commonStyles.cardDesc}>
          Your organization is live. Here&apos;s what you can do next to get
          things moving.
        </p>

        <div className={styles.checklist}>
          <GetStartedChecklistItem
            to="/organizations/$id/projects/create"
            params={params}
            icon={<IconFolderPlus size={19} aria-hidden="true" />}
            title="Create your first project"
            description="A long-term initiative with multiple tasks and contributors"
            onComplete={onComplete}
          />

          <GetStartedChecklistItem
            to="/organizations/$id/events/create"
            params={params}
            icon={<IconCalendarPlus size={19} aria-hidden="true" />}
            title="Schedule your first event"
            description="Plan a date for volunteers to gather and contribute"
            onComplete={onComplete}
          />

          <GetStartedChecklistItem
            to="/organizations/$id"
            params={params}
            icon={<IconChecklist size={19} aria-hidden="true" />}
            title="Add your first task"
            description="A single, focused activity volunteers can pick up"
            onComplete={onComplete}
          />

          <GetStartedChecklistItem
            to="/organizations/$id/members"
            params={params}
            icon={<IconShieldCog size={19} aria-hidden="true" />}
            title="Set up member roles"
            description="Define roles and permissions for your team"
            onComplete={onComplete}
          />

          <GetStartedChecklistItem
            to="/organizations/$id/members"
            params={params}
            icon={<IconUsersPlus size={19} aria-hidden="true" />}
            title="Invite members"
            description="Bring your team and volunteers on board"
            onComplete={onComplete}
          />
        </div>

        <div className={styles.divider}>
          <span className={styles.dividerLine} />
          <span className={styles.dividerText}>Or</span>
          <span className={styles.dividerLine} />
        </div>

        <Link
          to="/organizations/$id"
          params={params}
          className={`${commonStyles.continueButton} ${styles.organizationLink}`}
          onClick={onComplete}
        >
          Go to organization
        </Link>
      </div>
    </div>
  );
};
