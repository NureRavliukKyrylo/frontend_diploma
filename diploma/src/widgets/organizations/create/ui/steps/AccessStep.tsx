import { BaseButtonWrapper } from "@shared/ui/buttons";
import {
  IconDoorEnter,
  IconDoorExit,
  IconShieldCheck,
} from "@tabler/icons-react";
import type {
  OrganizationCreateAccessValues,
  OrganizationCreatePolicyValue,
} from "@features/organization/create-form";
import { organizationCreateAccessOptions } from "../../config/steps";
import commonStyles from "../Common.module.scss";
import styles from "./AccessStep.module.scss";

interface OrganizationCreateAccessStepProps {
  access: OrganizationCreateAccessValues;
  onChange: (
    field: "joinPolicy" | "leavePolicy",
    value: OrganizationCreatePolicyValue,
  ) => void;
  onSkip: () => void;
  onContinue: () => void;
  isSubmitting: boolean;
}

export const OrganizationCreateAccessStep = ({
  access,
  onChange,
  onSkip,
  onContinue,
  isSubmitting,
}: OrganizationCreateAccessStepProps) => {
  return (
    <div className={commonStyles.formShell}>
      <div className={commonStyles.card}>
        <div className={commonStyles.cardDeco} />
        <h2 className={commonStyles.cardHeading}>Set your access rules</h2>
        <p className={commonStyles.cardDesc}>
          Decide how volunteers can join your organization and how members can
          leave. You can change these settings anytime.
        </p>

        <div className={styles.accessRows}>
          <section className={styles.accessSection}>
            <h3 className={styles.accessLabel}>Join policy</h3>
            <div className={styles.choiceGrid}>
              {organizationCreateAccessOptions.joinPolicy.map(
                (option, index) => {
                  const isActive = access.joinPolicy === option.value;
                  const OptionIcon =
                    index === 0 ? IconDoorEnter : IconShieldCheck;

                  return (
                    <BaseButtonWrapper
                      key={option.value}
                      type="button"
                      className={`${styles.choiceCard} ${
                        isActive ? styles.choiceCardActive : ""
                      }`}
                      onClick={() => onChange("joinPolicy", option.value)}
                    >
                      <span className={styles.choiceIcon}>
                        <OptionIcon size={18} aria-hidden="true" />
                      </span>
                      <span className={styles.choiceTitle}>{option.label}</span>
                      <span className={styles.choiceDesc}>
                        {option.description}
                      </span>
                    </BaseButtonWrapper>
                  );
                },
              )}
            </div>
          </section>

          <section className={styles.accessSection}>
            <h3 className={styles.accessLabel}>Leave policy</h3>
            <div className={styles.choiceGrid}>
              {organizationCreateAccessOptions.leavePolicy.map(
                (option, index) => {
                  const isActive = access.leavePolicy === option.value;
                  const OptionIcon =
                    index === 0 ? IconDoorExit : IconShieldCheck;

                  return (
                    <BaseButtonWrapper
                      key={option.value}
                      type="button"
                      className={`${styles.choiceCard} ${
                        isActive ? styles.choiceCardActive : ""
                      }`}
                      onClick={() => onChange("leavePolicy", option.value)}
                    >
                      <span className={styles.choiceIcon}>
                        <OptionIcon size={18} aria-hidden="true" />
                      </span>
                      <span className={styles.choiceTitle}>{option.label}</span>
                      <span className={styles.choiceDesc}>
                        {option.description}
                      </span>
                    </BaseButtonWrapper>
                  );
                },
              )}
            </div>
          </section>
        </div>
      </div>

      <div className={commonStyles.continueWrap}>
        <BaseButtonWrapper
          type="button"
          className={commonStyles.skipButton}
          onClick={onSkip}
          disabled={isSubmitting}
        >
          Skip for now
        </BaseButtonWrapper>
        <BaseButtonWrapper
          type="button"
          className={commonStyles.continueButton}
          onClick={onContinue}
          loading={isSubmitting}
        >
          Create organization
        </BaseButtonWrapper>
      </div>
    </div>
  );
};
