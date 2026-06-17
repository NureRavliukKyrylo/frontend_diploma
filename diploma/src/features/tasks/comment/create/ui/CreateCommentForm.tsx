import { Avatar } from "@shared/ui";
import styles from "./CreateCommentForm.module.scss";
import { DefaultAvatar } from "@shared/assets/images/user";
import { useCreateComment } from "../model/useCreateComment";
import { SendMessageIcon } from "@shared/assets/icons/actions";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { InputAction } from "@shared/ui/inputs";
import { useTranslation } from "react-i18next";

interface CreateCommentFormProps {
  taskId: string;
  avatarUrl?: string;
  authorName?: string;
}

export const CreateCommentForm = ({
  taskId,
  avatarUrl,
  authorName,
}: CreateCommentFormProps) => {
  const { t } = useTranslation(["task"]);
  const { formik, isLoading } = useCreateComment(taskId);

  return (
    <form
      className={styles.createCommentWrapper}
      onSubmit={formik.handleSubmit}
    >
      <Avatar
        className={styles.avatarAuthor}
        fallback={authorName}
        src={avatarUrl ?? DefaultAvatar}
      />

      <div className={styles.sendMessageWrapper}>
        <InputAction
          id="body"
          name="body"
          type="text"
          value={formik.values.body}
          placeholder={t("task:comments.inputPlaceholder")}
          onChange={(e) => formik.setFieldValue("body", e.target.value)}
          error={formik.submitCount > 0 ? formik.errors.body : undefined}
          wrapperClassName={styles.sendMessageWrapper}
          action={
            <BaseButtonWrapper
              className={`${styles.sendMessage} ${isLoading ? styles.loading : ""}`}
              type="submit"
            >
              <SendMessageIcon className={styles.icon} />
            </BaseButtonWrapper>
          }
        />
      </div>
    </form>
  );
};
