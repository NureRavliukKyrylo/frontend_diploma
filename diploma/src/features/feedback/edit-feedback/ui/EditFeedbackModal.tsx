import { BaseModal } from "@shared/ui/modals";
import type { EntityType } from "@shared/config/types";
import { useTranslation } from "react-i18next";
import {
  FeedbackForm,
  useFeedbackForm,
} from "@features/feedback/modal-feedback";
import type { Feedback } from "@entities/feedback/model";

interface EditFeedbackModalProps {
  entityType: EntityType;
  entityId: string;
  isOpen: boolean;
  onClose: () => void;
  feedback: Pick<Feedback, "id" | "comment" | "rating">;
}

export const EditFeedbackModal = ({
  entityType,
  entityId,
  isOpen,
  onClose,
  feedback,
}: EditFeedbackModalProps) => {
  const { t } = useTranslation(["feedback"]);

  const handleClose = () => {
    formik.resetForm();
    mutation.reset();
    onClose();
  };

  const { formik, isLoading, mutation } = useFeedbackForm({
    entityType,
    entityId,
    initialValues: {
      id: feedback.id,
      rating: feedback.rating,
      comment: feedback.comment ?? "",
    },
    onSuccess: handleClose,
  });

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      error={
        formik.submitCount > 0
          ? formik.errors.rating || formik.errors.comment
          : ""
      }
      maxWidth="640px"
    >
      <FeedbackForm
        formik={formik}
        isLoading={isLoading}
        buttonText={t("feedback:actions.update")}
        title={t("feedback:form.editTitle")}
        description={t("feedback:form.editDescription")}
        entityType={entityType}
      />
    </BaseModal>
  );
};
