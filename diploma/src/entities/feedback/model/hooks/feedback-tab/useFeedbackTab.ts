import { useState } from "react";
import type { Feedback } from "../../types/FeedBack";
import { useTranslation } from "react-i18next";

type ModalType = "create" | "edit" | "delete" | null;

type SelectedFeedback = Pick<Feedback, "id" | "comment" | "rating">;

export const useFeedbackTab = () => {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedFeedback, setSelectedFeedback] =
    useState<SelectedFeedback | null>(null);
  const { t } = useTranslation(["feedback"]);

  const handleOpenModal = (feedback: SelectedFeedback, type: ModalType) => {
    setSelectedFeedback(feedback);
    setModalType(type);
  };

  const handleCloseModal = () => {
    setModalType(null);
    setSelectedFeedback(null);
  };

  const getMenuItems = (feedback: SelectedFeedback) => [
    {
      key: "edit",
      label: t("feedback:actions.editFeedback"),
      onClick: () => handleOpenModal(feedback, "edit"),
      variant: "edit" as const,
    },
    {
      key: "delete",
      label: t("feedback:actions.deleteFeedback"),
      onClick: () => handleOpenModal(feedback, "delete"),
      variant: "delete" as const,
    },
  ];

  return {
    modalType,
    selectedFeedback,
    getMenuItems,
    handleCloseModal,
    setModalType,
  };
};
