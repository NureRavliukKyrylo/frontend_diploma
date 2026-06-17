import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { FormikProps } from "formik";
import type { FeedbackFormValues } from "../model/useFeedbackForm";
import { Stars } from "@shared/ui/stars";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import styles from "./FeedbackForm.module.scss";
import { TextAreaForm } from "@shared/ui/inputs";
import { useTranslation } from "react-i18next";
import type { EntityType } from "@shared/config/types";

interface FeedbackFormProps {
  formik: FormikProps<FeedbackFormValues>;
  entityType: Exclude<EntityType, "organization">;
  isLoading: boolean;
  buttonText: string;
  title?: string;
  description?: string;
  questionText?: string;
}

export const FeedbackForm = ({
  formik,
  isLoading,
  buttonText,
  title,
  description,
  questionText,
  entityType,
}: FeedbackFormProps) => {
  const { t } = useTranslation(["feedback"]);
  const [isRatingSet, setIsRatingSet] = useState(Boolean(formik.values.rating));

  const handleRatingChange = (val: number) => {
    formik.setFieldValue("rating", val);
    setIsRatingSet(val > 0);
  };

  const entityLabel = t(`feedback:entities.${entityType}`);
  const dynamicQuestion =
    questionText ?? t("feedback:form.question", { entity: entityLabel });

  return (
    <div className={styles.submitRatingBlock}>
      <div className={styles.headerInformation}>
        <h1>{title ?? t("feedback:form.createTitle")}</h1>
        <p>{description ?? t("feedback:form.createDescription")}</p>
      </div>

      <form className={styles.formRating} onSubmit={formik.handleSubmit}>
        <div className={styles.setStarsBlock}>
          <h1>{dynamicQuestion}</h1>
          <Stars
            value={formik.values.rating}
            onChange={handleRatingChange}
            allowHalf={true}
            classNameStar={styles.interactiveStar}
            gradient="linear-gradient(180deg, #8C0000 0%, #260000 100%)"
            className={styles.wrapperStars}
          />
        </div>

        <AnimatePresence>
          {isRatingSet && (
            <motion.div
              className={styles.setCommentBlock}
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ overflow: "hidden" }}
            >
              <h1>{t("feedback:form.improvementQuestion")}</h1>
              <TextAreaForm
                name="comment"
                value={formik.values.comment}
                onChange={formik.handleChange}
                placeholder={t("feedback:form.placeholder")}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <BaseButtonWrapper
          className={styles.submitRatingButton}
          type="submit"
          disabled={isLoading}
        >
          {buttonText}
        </BaseButtonWrapper>
      </form>
    </div>
  );
};
