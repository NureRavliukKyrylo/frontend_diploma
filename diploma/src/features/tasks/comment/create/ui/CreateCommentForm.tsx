import { Avatar } from "@shared/ui";
import styles from "./CreateCommentForm.module.scss";
import { useCreateComment } from "../model/useCreateComment";
import { SendMessageIcon } from "@shared/assets/icons/actions";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { InputAction } from "@shared/ui/inputs";
import { useTranslation } from "react-i18next";

interface CreateCommentFormProps {
  taskId: string;
  avatarUrl?: string;
  authorName?: string;
  parentCommentId?: string;
  replyToUserId?: string;
  replyToName?: string;
  variant?: "default" | "reply";
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const CreateCommentForm = ({
  taskId,
  avatarUrl,
  authorName,
  parentCommentId,
  replyToUserId,
  replyToName,
  variant = "default",
  onSuccess,
  onCancel,
}: CreateCommentFormProps) => {
  const { t } = useTranslation(["task"]);
  const { formik, isLoading } = useCreateComment(
    taskId,
    parentCommentId,
    replyToUserId,
    onSuccess,
  );
  const isReply = variant === "reply";

  return (
    <form
      className={`${styles.createCommentWrapper} ${
        isReply ? styles.replyForm : ""
      }`}
      onSubmit={formik.handleSubmit}
    >
      {!isReply && (
        <Avatar
          className={styles.avatarAuthor}
          fallback={authorName}
          src={avatarUrl}
        />
      )}

      <div className={styles.formBody}>
        {isReply && (
          <div className={styles.replyContext}>
            <span>
              {t("task:comments.replyingTo", { name: replyToName })}
            </span>
            <button type="button" onClick={onCancel}>
              {t("task:comments.actions.cancel")}
            </button>
          </div>
        )}
        <InputAction
          id="body"
          name="body"
          type="text"
          value={formik.values.body}
          placeholder={
            isReply
              ? t("task:comments.replyPlaceholder", { name: replyToName })
              : t("task:comments.inputPlaceholder")
          }
          onChange={(e) => formik.setFieldValue("body", e.target.value)}
          error={formik.submitCount > 0 ? formik.errors.body : undefined}
          wrapperClassName={styles.sendMessageWrapper}
          inputClassName={isReply ? styles.replyInput : undefined}
          autoFocus={isReply}
          disabled={isLoading}
          action={
            <BaseButtonWrapper
              className={`${styles.sendMessage} ${isLoading ? styles.loading : ""}`}
              type="submit"
              loading={isLoading}
              disabled={isLoading}
              aria-label={t("task:comments.actions.send")}
            >
              {!isLoading && <SendMessageIcon className={styles.icon} />}
            </BaseButtonWrapper>
          }
        />
      </div>
    </form>
  );
};
