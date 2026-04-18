import type { Feedback } from "@entities/feedback/model";
import styles from "./FeedbackBase.module.scss";
import { Stars } from "@shared/ui/stars";
import { formatDateToInput } from "@shared/libs/date";

interface FeedbackBaseProps {
  feedback: Feedback;
  displayName?: string;
}

export const FeedbackBase = ({ feedback, displayName }: FeedbackBaseProps) => {
  const fullName =
    displayName ??
    [feedback.member?.firstName, feedback.member?.lastName]
      .filter(Boolean)
      .join(" ");

  return (
    <>
      <div className={styles.memberInfo}>
        <img src={feedback.member.avatarUrl} alt="memberAvatar" />
        <div className={styles.initialsMember}>
          <h1>{fullName}</h1>
          <h2>{feedback.member.role.name}</h2>
        </div>
      </div>
      <div className={styles.feedbackInfo}>
        <div className={styles.ratingAndDate}>
          <Stars
            value={feedback.rating}
            gradient="linear-gradient(180deg, #8C0000 0%, #260000 100%)"
          />
          <h1>{formatDateToInput(feedback.createdAt)}</h1>
        </div>
        <p>{feedback.comment}</p>
      </div>
    </>
  );
};
