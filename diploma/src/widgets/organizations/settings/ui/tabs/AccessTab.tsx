import { ClipboardCheck, DoorClosed, DoorOpen, Lock } from "lucide-react";
import { useTranslation } from "react-i18next";
import type {
  OrganizationPolicyChangeHandler,
  OrganizationPolicyValue,
  OrganizationSettingsValues,
} from "@features/organization/settings-form";
import type { Organization } from "@entities/organization";
import styles from "./AccessTab.module.scss";

interface AccessTabProps {
  organizationId: string;
  organization: Organization;
  values: OrganizationSettingsValues;
  onPolicyChange: OrganizationPolicyChangeHandler;
}

const joinPolicyOptions: Array<{
  value: OrganizationPolicyValue;
  titleKey: string;
  descriptionKey: string;
  icon: typeof DoorOpen;
}> = [
  {
    value: "open",
    titleKey: "settings.access.open",
    descriptionKey: "settings.access.openText",
    icon: DoorOpen,
  },
  {
    value: "approval_required",
    titleKey: "settings.access.approval",
    descriptionKey: "settings.access.approvalText",
    icon: ClipboardCheck,
  },
];

const leavePolicyOptions: Array<{
  value: OrganizationPolicyValue;
  titleKey: string;
  descriptionKey: string;
  icon: typeof DoorOpen;
}> = [
  {
    value: "open",
    titleKey: "settings.access.leaveFreely",
    descriptionKey: "settings.access.leaveFreelyText",
    icon: DoorClosed,
  },
  {
    value: "approval_required",
    titleKey: "settings.access.leaveApproval",
    descriptionKey: "settings.access.leaveApprovalText",
    icon: Lock,
  },
];

export const AccessTab = ({ values, onPolicyChange }: AccessTabProps) => {
  const { t } = useTranslation("organizations");
  return (
    <div className={styles.sectionsContainer}>
      <section className={styles.section}>
        <h2 className={styles.sectionLabel}>
          {t("settings.access.joinTitle")}
        </h2>
        <p className={styles.sectionDescription}>
          {t("settings.access.joinText")}
        </p>

        <div className={styles.policyGrid}>
          {joinPolicyOptions.map((option) => {
            const selected = values.joinPolicy === option.value;
            const Icon = option.icon;

            return (
              <button
                key={option.value}
                type="button"
                className={`${styles.policyCard} ${
                  selected ? styles.policyCardSelected : ""
                }`}
                onClick={() => onPolicyChange("joinPolicy", option.value)}
              >
                <span className={styles.policyTopRow}>
                  <span className={styles.policyIcon}>
                    <Icon size={24} strokeWidth={2.2} />
                  </span>
                  <span className={styles.radioDot} aria-hidden="true">
                    <span />
                  </span>
                </span>
                <strong>{t(option.titleKey)}</strong>
                <small>{t(option.descriptionKey)}</small>
              </button>
            );
          })}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionLabel}>
          {t("settings.access.leaveTitle")}
        </h2>
        <p className={styles.sectionDescription}>
          {t("settings.access.leaveText")}
        </p>

        <div className={styles.policyGrid}>
          {leavePolicyOptions.map((option) => {
            const selected = values.leavePolicy === option.value;
            const Icon = option.icon;

            return (
              <button
                key={option.value}
                type="button"
                className={`${styles.policyCard} ${
                  selected ? styles.policyCardSelected : ""
                }`}
                onClick={() => onPolicyChange("leavePolicy", option.value)}
              >
                <span className={styles.policyTopRow}>
                  <span className={styles.policyIcon}>
                    <Icon size={24} strokeWidth={2.2} />
                  </span>
                  <span className={styles.radioDot} aria-hidden="true">
                    <span />
                  </span>
                </span>
                <strong>{t(option.titleKey)}</strong>
                <small>{t(option.descriptionKey)}</small>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};
