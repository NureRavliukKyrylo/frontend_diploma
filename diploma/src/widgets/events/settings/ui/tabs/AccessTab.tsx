import { ClipboardCheck, DoorClosed, DoorOpen, Lock } from "lucide-react";
import type { EventPolicyField, EventSettingsValues } from "@features/event";
import type { Policy } from "@shared/config/types";
import { useTranslation } from "react-i18next";
import styles from "./AccessTab.module.scss";

interface AccessTabProps {
  values: EventSettingsValues;
  onPolicyChange: (field: EventPolicyField, value: Policy) => void;
}

const joinPolicyOptions: Array<{
  value: Policy;
  titleKey: string;
  descriptionKey: string;
  icon: typeof DoorOpen;
}> = [
  {
    value: "open",
    titleKey: "settings.access.open",
    descriptionKey: "settings.access.joinOpenText",
    icon: DoorOpen,
  },
  {
    value: "approval_required",
    titleKey: "settings.access.joinApproval",
    descriptionKey: "settings.access.joinApprovalText",
    icon: ClipboardCheck,
  },
];

const leavePolicyOptions: Array<{
  value: Policy;
  titleKey: string;
  descriptionKey: string;
  icon: typeof DoorOpen;
}> = [
  {
    value: "open",
    titleKey: "settings.access.leaveOpen",
    descriptionKey: "settings.access.leaveOpenText",
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
  const { t } = useTranslation("event");

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
