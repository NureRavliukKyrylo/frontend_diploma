import styles from "./EditCommentForm.module.scss";
import { SendMessageIcon } from "@shared/assets/icons/actions";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { InputAction } from "@shared/ui/inputs";
import { useEditComment } from "../model/useEditComment";
import { useTranslation } from "react-i18next";

interface EditCommentFormProps {
  taskId: string;
  commentId: string;
  initialBody: string;
  onCancel?: () => void;
}

export const EditCommentForm = ({
  taskId,
  commentId,
  onCancel,
  initialBody,
}: EditCommentFormProps) => {
  const { t, i18n } = useTranslation(["task"]);
  const { formik, isLoading, mutation } = useEditComment(
    taskId,
    commentId,
    initialBody,
    onCancel,
  );

  const handleCancel = () => {
    formik.resetForm();
    mutation.reset();
    onCancel?.();
  };

  return (
    <form className={styles.formEdit} onSubmit={formik.handleSubmit}>
      <div className={styles.editMessageWrapper}>
        <InputAction
          id="body"
          name="body"
          type="text"
          value={formik.values.body}
          placeholder={t("task:comments.inputEditPlaceholder")}
          onChange={(e) => formik.setFieldValue("body", e.target.value)}
          error={formik.submitCount > 0 ? formik.errors.body : undefined}
          wrapperClassName={styles.editMessageWrapper}
          variant={i18n.language === "uk" ? "editLocalized" : "edit"}
          action={
            <div className={styles.actions}>
              <BaseButtonWrapper
                onClick={handleCancel}
                className={styles.cancel}
                type="button"
              >
                {t("task:comments.actions.cancel")}
              </BaseButtonWrapper>
              <BaseButtonWrapper
                className={`${styles.editMessage} ${isLoading ? styles.loading : ""}`}
                type="submit"
              >
                <SendMessageIcon className={styles.icon} />
              </BaseButtonWrapper>
            </div>
          }
        />
      </div>
    </form>
  );
};
