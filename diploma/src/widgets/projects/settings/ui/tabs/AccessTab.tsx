import { ClipboardCheck, DoorClosed, DoorOpen, Lock } from "lucide-react";
import type {
  ProjectPolicyField,
  ProjectSettingsValues,
} from "@features/project";
import type { Policy } from "@shared/config/types";
import styles from "./AccessTab.module.scss";

interface AccessTabProps {
  values: ProjectSettingsValues;
  onPolicyChange: (field: ProjectPolicyField, value: Policy) => void;
}

const joinPolicyOptions: Array<{
  value: Policy;
  title: string;
  description: string;
  icon: typeof DoorOpen;
}> = [
  {
    value: "open",
    title: "Open",
    description: "Anyone can join instantly without waiting for approval",
    icon: DoorOpen,
  },
  {
    value: "approval_required",
    title: "Approval required",
    description: "New volunteers must be manually approved by an admin",
    icon: ClipboardCheck,
  },
];

const leavePolicyOptions: Array<{
  value: Policy;
  title: string;
  description: string;
  icon: typeof DoorOpen;
}> = [
  {
    value: "open",
    title: "Open",
    description: "Volunteers can leave at any time without restrictions",
    icon: DoorClosed,
  },
  {
    value: "approval_required",
    title: "Approval required",
    description: "Leave requests must be confirmed by an admin",
    icon: Lock,
  },
];

export const AccessTab = ({ values, onPolicyChange }: AccessTabProps) => {
  return (
    <div className={styles.sectionsContainer}>
      <section className={styles.section}>
        <h2 className={styles.sectionLabel}>Join policy</h2>
        <p className={styles.sectionDescription}>
          Control how new volunteers join your project.
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
                <strong>{option.title}</strong>
                <small>{option.description}</small>
              </button>
            );
          })}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionLabel}>Leave policy</h2>
        <p className={styles.sectionDescription}>
          Choose whether volunteers can leave freely or need confirmation.
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
                <strong>{option.title}</strong>
                <small>{option.description}</small>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};
