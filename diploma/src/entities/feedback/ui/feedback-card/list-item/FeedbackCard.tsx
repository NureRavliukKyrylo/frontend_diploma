import type { Feedback as FeedbackType } from "@entities/feedback/model";
import styles from "./FeedbackCard.module.scss";
import { FeedbackBase } from "../base/FeedbackBase";

interface FeedbackCardProps {
  feedback: FeedbackType;
  displayName?: string;
}

export const FeedbackCard = ({ feedback, displayName }: FeedbackCardProps) => {
  return (
    <div className={styles.feedbackWrapper}>
      <FeedbackBase feedback={feedback} displayName={displayName} />
    </div>
  );
};
