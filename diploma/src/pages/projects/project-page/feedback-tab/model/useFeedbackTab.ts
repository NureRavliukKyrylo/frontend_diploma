import { useState } from "react";
import type { Feedback } from "@entities/feedback/model";

type ModalType = "create" | "edit" | "delete" | null;

type SelectedFeedback = Pick<Feedback, "id" | "comment" | "rating">;

export const useFeedbackTab = () => {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedFeedback, setSelectedFeedback] =
    useState<SelectedFeedback | null>(null);

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
      label: "Edit Feedback",
      onClick: () => handleOpenModal(feedback, "edit"),
      variant: "default" as const,
    },
    {
      key: "delete",
      label: "Delete Feedback",
      onClick: () => handleOpenModal(feedback, "delete"),
      variant: "leave" as const,
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
