import { Tab } from "@shared/ui";
import { useSkillsInfiniteQuery } from "@entities/skill";
import styles from "./SkillsStep.module.scss";
import { useSkillsForm } from "../model/useSkillsForm";
import type { OfferFormData } from "@entities/offer";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { forwardRef, useImperativeHandle } from "react";
import type { StepRef } from "../../main";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface SkillsStepProps {
  data: OfferFormData;
}

export const SkillsStep = forwardRef<StepRef, SkillsStepProps>(
  ({ data }, ref) => {
    const { formik, toggleSkill } = useSkillsForm({ data });
    const { t } = useTranslation(["common", "timeBank"]);

    useImperativeHandle(ref, () => ({
      submitForm: async () => {
        const errors = await formik.validateForm();
        if (Object.keys(errors).length === 0) {
          await formik.submitForm();
          return true;
        }
        formik.setTouched(
          Object.keys(formik.values).reduce(
            (acc, key) => ({ ...acc, [key]: true }),
            {},
          ),
        );
        return false;
      },
    }));

    const skillsQuery = useSkillsInfiniteQuery({ PageSize: 12 })();

    const selected = data.skills;
    const rest =
      skillsQuery.data?.filter(
        (skill) => !selected.some((s) => s.id === skill.id),
      ) ?? [];

    const orderedSkills = [...selected, ...rest];

    if (skillsQuery.isError) {
      return (
        <div className={styles.stateMessage}>
          <p className={styles.errorMessage}>
            {t("timeBank:forms.states.failedSkills")}
          </p>
        </div>
      );
    }

    if (skillsQuery.data?.length === 0) {
      return (
        <p className={styles.emptyText}>
          {t("timeBank:forms.states.emptySkills")}
        </p>
      );
    }

    return (
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.section}>
          <div className={styles.tagsWrapper}>
            <AnimatePresence mode="wait">
              {orderedSkills.map((skill, index) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <Tab
                    name={skill.name}
                    className={styles.skillTab}
                    isSelected={formik.values.skills.some(
                      (c) => c.id === skill.id,
                    )}
                    onClick={() => toggleSkill(skill)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          {skillsQuery.hasNextPage && (
            <BaseButtonWrapper
              onClick={() => skillsQuery.fetchNextPage?.()}
              disabled={skillsQuery.isFetchingNextPage}
              className={styles.showMoreSkillsButton}
              type="button"
            >
              {skillsQuery.isFetchingNextPage
                ? t("common:loading.title")
                : t("common:actions.seeMore").toLowerCase()}
            </BaseButtonWrapper>
          )}
          {formik.touched.skills && formik.errors.skills && (
            <div className="errorInput">{formik.errors.skills as string}</div>
          )}
        </div>
      </form>
    );
  },
);
