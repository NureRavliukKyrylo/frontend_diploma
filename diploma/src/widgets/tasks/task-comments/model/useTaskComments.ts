import type { TaskComment } from "@entities/task/model";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type ModalType = "edit" | "delete";

export const useTaskComments = () => {
  const [selectedTaskComment, setSelectedTaskComment] =
    useState<TaskComment | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const { t } = useTranslation(["task"]);

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
      label: t("task:comments.actions.editComment"),
      onClick: () => setEditingId(comment.id),
      variant: "edit" as const,
    },
    {
      key: "delete",
      label: t("task:comments.actions.deleteComment"),
      onClick: () => handleOpenModal(comment, "delete"),
      variant: "delete" as const,
    },
  ];
  const handleCancel = () => {
    setEditingId(null);
  };

  return {
    modalType,
    selectedTaskComment,
    getMenuItems,
    handleCloseModal,
    editingId,
    handleCancel,
  };
};
