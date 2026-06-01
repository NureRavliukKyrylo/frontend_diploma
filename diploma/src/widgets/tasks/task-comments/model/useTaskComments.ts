import type { TaskComment } from "@entities/task/model";
import { useState } from "react";

type ModalType = "edit" | "delete";

export const useTaskComments = () => {
  const [selectedTaskComment, setSelectedTaskComment] =
    useState<TaskComment | null>(null);
  const [modalType, setModalType] = useState<ModalType | null>(null);

  const handleOpenModal = (comment: TaskComment, type: ModalType) => {
    setSelectedTaskComment(comment);
    setModalType(type);
  };

  const handleCloseModal = () => {
    setModalType(null);
    setSelectedTaskComment(null);
  };

  const getMenuItems = (comment: TaskComment) => [
    {
      key: "edit",
      label: "Edit Comment",
      onClick: () => handleOpenModal(comment, "edit"),
      variant: "edit" as const,
    },
    {
      key: "delete",
      label: "Delete Comment",
      onClick: () => handleOpenModal(comment, "delete"),
      variant: "delete" as const,
    },
  ];

  return {
    modalType,
    selectedTaskComment,
    getMenuItems,
    handleCloseModal,
  };
};
