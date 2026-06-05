import { Tab } from "@shared/ui";
import { useSkillsInfiniteQuery } from "@entities/skill";
import styles from "./SkillsStep.module.scss";
import { useSkillsForm } from "../model/useSkillsForm";
import type { OfferFormData } from "@entities/offer";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { forwardRef, useImperativeHandle } from "react";
import type { StepRef } from "../../main";
import { AnimatePresence, motion } from "framer-motion";

interface SkillsStepProps {
  data: OfferFormData;
}

export const SkillsStep = forwardRef<StepRef, SkillsStepProps>(
  ({ data }, ref) => {
    const { formik, toggleSkill } = useSkillsForm({ data });

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

    if (skillsQuery.isError) {
      return (
        <div className={styles.stateMessage}>
          <p className={styles.errorMessage}>Failed to load skills</p>
        </div>
      );
    }

    if (skillsQuery.data?.length === 0) {
      return <p className={styles.emptyText}>No skills found</p>;
    }

    return (
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.section}>
          <div className={styles.tagsWrapper}>
            <AnimatePresence mode="wait">
              {skillsQuery.data?.map((skill, index) => (
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
                    isSelected={formik.values.skillIds.includes(skill.id)}
                    onClick={() => toggleSkill(skill.id)}
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
              {skillsQuery.isFetchingNextPage ? "Loading..." : "show more"}
            </BaseButtonWrapper>
          )}
          {formik.touched.skillIds && formik.errors.skillIds && (
            <div className="errorInput">{formik.errors.skillIds as string}</div>
          )}
        </div>
      </form>
    );
  },
);
