import { useEffect, useMemo, useState } from "react";
import { addToast } from "@heroui/react";
import { type Task } from "@entities/task";
import type { Policy } from "@shared/config/types";
import { getTaskEditDefaults, getTaskStatus } from "../lib/getTaskEditDefaults";
import { getTaskEditValidationErrors } from "../lib/getTaskEditValidationErrors";
import { hasTaskContentManagePermission } from "../lib/taskEditAccess";
import { useTaskEditLocationHandlers } from "./useTaskEditLocationHandlers";
import { useTaskEditMutations } from "./useTaskEditMutations";
import { useTaskEditSelectionHandlers } from "./useTaskEditSelectionHandlers";
import type {
  PendingTaskPolicyChange,
  TaskPolicyField,
  TaskSettingsChangeHandler,
  TaskSettingsErrors,
  TaskSettingsValues,
} from "./types";

interface UseTaskEditFormOptions {
  task: Task;
  onExitEdit: () => void;
  onCloseDrawer?: () => void;
}

export const useTaskEditForm = ({
  task,
  onExitEdit,
  onCloseDrawer,
}: UseTaskEditFormOptions) => {
  const initialValues = useMemo(() => getTaskEditDefaults(task), [task]);
  const [values, setValues] = useState<TaskSettingsValues>(initialValues);
  const [errors, setErrors] = useState<TaskSettingsErrors>({});
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [pendingPolicyChange, setPendingPolicyChange] =
    useState<PendingTaskPolicyChange | null>(null);

  useEffect(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  const { updateMutation, cancelMutation, deleteMutation } =
    useTaskEditMutations({
      task,
      onExitEdit,
      onCloseDrawer,
      setIsSaveModalOpen,
      setIsCancelModalOpen,
      setIsDeleteModalOpen,
    });

  const handleChange: TaskSettingsChangeHandler = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleDateChange = (
    field: "startAt" | "endAt" | "reminderAtUtc",
    value: string | null,
  ) => {
    handleChange(field, value ?? "");
  };

  const { handleCategoryToggle, handleSkillToggle } =
    useTaskEditSelectionHandlers({ setValues });
  const {
    handleLocationTextChange,
    handleLocationClear,
    handleLocationChange,
  } = useTaskEditLocationHandlers({ setValues });

  const handlePolicyChange = (field: TaskPolicyField, value: Policy) => {
    if (values[field] === value) return;
    setPendingPolicyChange({ field, value });
  };

  const handlePolicyConfirm = () => {
    if (!pendingPolicyChange) return;

    handleChange(pendingPolicyChange.field, pendingPolicyChange.value);
    setPendingPolicyChange(null);
  };

  const handleDiscard = () => {
    setValues(initialValues);
    setErrors({});
    onExitEdit();
  };

  const handleSave = () => {
    const nextErrors = getTaskEditValidationErrors(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      addToast({ title: "Please check task fields", color: "danger" });
      return;
    }

    setIsSaveModalOpen(true);
  };

  const handleSaveConfirm = () => {
    updateMutation.mutate(values);
  };

  return {
    values,
    errors,
    taskStatus: getTaskStatus(task),
    canEditTask: hasTaskContentManagePermission(task),
    isSaveModalOpen,
    isCancelModalOpen,
    isDeleteModalOpen,
    pendingPolicyChange,
    isSavePending: updateMutation.isPending,
    isCancelPending: cancelMutation.isPending,
    isDeletePending: deleteMutation.isPending,
    handleChange,
    handleDateChange,
    handleCategoryToggle,
    handleSkillToggle,
    handleLocationTextChange,
    handleLocationChange,
    handleLocationClear,
    handlePolicyChange,
    handlePolicyConfirm,
    handleDiscard,
    handleSave,
    handleSaveConfirm,
    setIsSaveModalOpen,
    setIsCancelModalOpen,
    setIsDeleteModalOpen,
    setPendingPolicyChange,
    cancelTask: cancelMutation.mutate,
    deleteTask: deleteMutation.mutate,
  };
};
