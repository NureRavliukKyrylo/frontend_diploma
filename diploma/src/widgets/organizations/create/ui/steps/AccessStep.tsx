import { BaseButtonWrapper } from "@shared/ui/buttons";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation("organizations");
  return (
    <div className={commonStyles.formShell}>
      <div className={commonStyles.card}>
        <div className={commonStyles.cardDeco} />
        <h2 className={commonStyles.cardHeading}>
          {t("create.access.title")}
        </h2>
        <p className={commonStyles.cardDesc}>
          {t("create.access.text")}
        </p>

        <div className={styles.accessRows}>
          <section className={styles.accessSection}>
            <h3 className={styles.accessLabel}>
              {t("create.fields.joinPolicy")}
            </h3>
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
                      <span className={styles.choiceTitle}>
                        {t(option.labelKey)}
                      </span>
                      <span className={styles.choiceDesc}>
                        {t(option.descriptionKey)}
                      </span>
                    </BaseButtonWrapper>
                  );
                },
              )}
            </div>
          </section>

          <section className={styles.accessSection}>
            <h3 className={styles.accessLabel}>
              {t("create.fields.leavePolicy")}
            </h3>
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
                      <span className={styles.choiceTitle}>
                        {t(option.labelKey)}
                      </span>
                      <span className={styles.choiceDesc}>
                        {t(option.descriptionKey)}
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
          {t("create.actions.skip")}
        </BaseButtonWrapper>
        <BaseButtonWrapper
          type="button"
          className={commonStyles.continueButton}
          onClick={onContinue}
          loading={isSubmitting}
        >
          {t("create.actions.create")}
        </BaseButtonWrapper>
      </div>
    </div>
  );
};
