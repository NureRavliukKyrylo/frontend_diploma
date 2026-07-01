import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation("organizations");
  const params = { id: organization.id };

  return (
    <div className={commonStyles.formShell}>
      <div className={commonStyles.card}>
        <div className={commonStyles.cardDeco} />
        <h2 className={commonStyles.cardHeading}>
          {t("create.getStarted.welcome", { name: organization.name })}
        </h2>
        <p className={commonStyles.cardDesc}>
          {t("create.getStarted.readyText")}
        </p>

        <div className={styles.checklist}>
          <GetStartedChecklistItem
            to="/organizations/$id/projects/create"
            params={params}
            icon={<IconFolderPlus size={19} aria-hidden="true" />}
            title={t("create.getStarted.firstProject")}
            description={t("create.getStarted.firstProjectText")}
            onComplete={onComplete}
          />

          <GetStartedChecklistItem
            to="/organizations/$id/events/create"
            params={params}
            icon={<IconCalendarPlus size={19} aria-hidden="true" />}
            title={t("create.getStarted.firstEvent")}
            description={t("create.getStarted.firstEventText")}
            onComplete={onComplete}
          />

          <GetStartedChecklistItem
            to="/organizations/$id"
            params={params}
            icon={<IconChecklist size={19} aria-hidden="true" />}
            title={t("create.getStarted.firstTask")}
            description={t("create.getStarted.firstTaskText")}
            onComplete={onComplete}
          />

          <GetStartedChecklistItem
            to="/organizations/$id/members"
            params={params}
            icon={<IconShieldCog size={19} aria-hidden="true" />}
            title={t("create.getStarted.roles")}
            description={t("create.getStarted.rolesText")}
            onComplete={onComplete}
          />

          <GetStartedChecklistItem
            to="/organizations/$id/members"
            params={params}
            icon={<IconUsersPlus size={19} aria-hidden="true" />}
            title={t("create.getStarted.invite")}
            description={t("create.getStarted.inviteText")}
            onComplete={onComplete}
          />
        </div>

        <div className={styles.divider}>
          <span className={styles.dividerLine} />
          <span className={styles.dividerText}>
            {t("create.actions.or")}
          </span>
          <span className={styles.dividerLine} />
        </div>

        <Link
          to="/organizations/$id"
          params={params}
          className={`${commonStyles.continueButton} ${styles.organizationLink}`}
          onClick={onComplete}
        >
          {t("create.getStarted.goToOrganization")}
        </Link>
      </div>
    </div>
  );
};
