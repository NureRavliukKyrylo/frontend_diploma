import type { Task } from "@entities/task";
import { useState } from "react";

type ModalType = "leave" | "status" | null;

export const useJoinedTasksTab = () => {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleOpenModal = (task: Task, type: ModalType) => {
    setSelectedTask(task);
    setModalType(type);
  };

  const handleCloseModal = () => {
    setModalType(null);
    setSelectedTask(null);
  };

  const getMenuItems = (task: Task) => [
    {
      key: "leave",
      label: "Leave",
      onClick: () => handleOpenModal(task, "leave"),
      variant: "leave" as const,
    },
    {
      key: "status",
      label: "Change Status",
      onClick: () => handleOpenModal(task, "status"),
      variant: "changeStatus" as const,
    },
  ];

  return {
    modalType,
    selectedTask,
    getMenuItems,
    handleCloseModal,
  };
};
