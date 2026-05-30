import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { FormikProps } from "formik";
import type { FeedbackFormValues } from "../model/useFeedbackForm";
import { Stars } from "@shared/ui/stars";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import styles from "./FeedbackForm.module.scss";
import { TextAreaForm } from "@shared/ui/inputs";

interface FeedbackFormProps {
  formik: FormikProps<FeedbackFormValues>;
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
  title = "Your Feedback Matters",
  description = "It takes less than a minute to complete.",
  questionText = "How was your overall experience with this project?",
}: FeedbackFormProps) => {
  const [isRatingSet, setIsRatingSet] = useState(Boolean(formik.values.rating));

  const handleRatingChange = (val: number) => {
    formik.setFieldValue("rating", val);
    setIsRatingSet(val > 0);
  };

  return (
    <div className={styles.submitRatingBlock}>
      <div className={styles.headerInformation}>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>

      <form className={styles.formRating} onSubmit={formik.handleSubmit}>
        <div className={styles.setStarsBlock}>
          <h1>{questionText}</h1>
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
              <h1>What could we improve?</h1>
              <TextAreaForm
                name="comment"
                value={formik.values.comment}
                onChange={formik.handleChange}
                placeholder="Tell us more about your experience..."
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
