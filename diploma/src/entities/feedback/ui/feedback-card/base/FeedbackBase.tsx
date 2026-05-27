import type { Feedback } from "@entities/feedback/model";
import styles from "./FeedbackBase.module.scss";
import { Stars } from "@shared/ui/stars";
import { formatDateToInput } from "@shared/libs/date";
import { getFullName } from "@entities/user";

interface FeedbackBaseProps {
  feedback: Feedback;
  displayName?: string;
  rightContent?: React.ReactNode;
}

export const FeedbackBase = ({
  feedback,
  displayName,
  rightContent,
}: FeedbackBaseProps) => {
  return (
    <div
      className={`${styles.feedbackBaseWrapper} ${rightContent ? styles.hasRightContent : ""}`}
    >
      <div className={styles.memberInfo}>
        <img src={feedback.author.avatarUrl} alt="memberAvatar" />
        <div className={styles.initialsMember}>
          <h1>
            {displayName ??
              getFullName(feedback.author.firstName, feedback.author.lastName)}
          </h1>
          <h2>{feedback.author.role.name}</h2>
        </div>
      </div>
      <div className={styles.feedbackInfo}>
        <div className={styles.ratingAndDate}>
          <Stars
            value={feedback.rating}
            gradient="linear-gradient(180deg, #8C0000 0%, #260000 100%)"
            classNameStar={styles.feedbackStar}
          />
          <h1>{formatDateToInput(feedback.createdAt)}</h1>
        </div>
        <p>{feedback.comment}</p>
      </div>
      {rightContent && (
        <div className={styles.rightContent}>{rightContent}</div>
      )}
    </div>
  );
};
