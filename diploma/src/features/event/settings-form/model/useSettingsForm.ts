import { useEffect, useMemo, useState } from "react";
import { addToast } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { eventQuery } from "@entities/event";
import type { Policy } from "@shared/config/types";
import {
  getEventLockState,
  getEventStatus,
  hasEventContentManagePermission,
} from "../lib/eventSettingsMeta";
import { getEventSettingsDefaults } from "../lib/getEventSettingsDefaults";
import { getEventSettingsValidationErrors } from "../lib/getEventSettingsValidationErrors";
import { useEventAttendanceHandlers } from "./useEventAttendanceHandlers";
import { useEventLocationHandlers } from "./useEventLocationHandlers";
import { useEventSettingsMutations } from "./useEventSettingsMutations";
import { useEventSkillHandlers } from "./useEventSkillHandlers";
import type {
  EventPolicyField,
  EventSettingsChangeHandler,
  EventSettingsErrors,
  EventSettingsValues,
  PendingEventPolicyChange,
} from "./types";

export const useEventSettingsForm = (eventId: string) => {
  const navigate = useNavigate();
  const { data: event, isError, isPending } = useQuery(eventQuery.id(eventId));
  const initialValues = useMemo(
    () => (event ? getEventSettingsDefaults(event) : null),
    [event],
  );
  const lockState = useMemo(() => getEventLockState(event), [event]);
  const [values, setValues] = useState<EventSettingsValues | null>(null);
  const [errors, setErrors] = useState<EventSettingsErrors>({});
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [pendingPolicyChange, setPendingPolicyChange] =
    useState<PendingEventPolicyChange | null>(null);

  useEffect(() => {
    if (!initialValues) return;

    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  const { updateDetailsMutation, cancelMutation } = useEventSettingsMutations({
    eventId,
    event,
    cancelReason,
    setIsSaveModalOpen,
    setIsCancelModalOpen,
    setCancelReason,
  });

  const handleChange: EventSettingsChangeHandler = (field, value) => {
    setValues((current) => (current ? { ...current, [field]: value } : current));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleDateChange = (
    field: "startAt" | "endAt",
    value: string | null,
  ) => {
    handleChange(field, value ?? "");
  };

  const handleCategoryToggle = (categoryId: string) => {
    setValues((current) => {
      if (!current) return current;

      const selected = current.categoryIds.includes(categoryId);

      return {
        ...current,
        categoryIds: selected
          ? current.categoryIds.filter((id) => id !== categoryId)
          : [...current.categoryIds, categoryId],
      };
    });
  };

  const { handleLocationTextChange, handleLocationChange } =
    useEventLocationHandlers({ setValues });
  const { handleSkillAdd, handleSkillChange, handleSkillRemove } =
    useEventSkillHandlers({ setValues });

  const handlePolicyChange = (field: EventPolicyField, value: Policy) => {
    if (!values || values[field] === value) return;
    setPendingPolicyChange({ field, value });
  };

  const handlePolicyConfirm = () => {
    if (!pendingPolicyChange) return;

    handleChange(pendingPolicyChange.field, pendingPolicyChange.value);
    setPendingPolicyChange(null);
  };

  const { handleAttendanceToggle, handleRadiusChange, handleRadiusClear } =
    useEventAttendanceHandlers({ setValues, setErrors });

  const handleDiscard = () => {
    setValues(initialValues);
    setErrors({});
  };

  const handleSave = () => {
    if (!values) return;

    const nextErrors = getEventSettingsValidationErrors(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      addToast({ title: "Please check required fields", color: "danger" });
      return;
    }

    setIsSaveModalOpen(true);
  };

  const handleSaveConfirm = () => {
    if (!values) return;
    updateDetailsMutation.mutate(values);
  };

  const navigateToEvent = () => {
    void navigate({ to: "/events/$id", params: { id: eventId } });
  };

  return {
    event,
    eventStatus: event ? getEventStatus(event) : "active",
    values,
    errors,
    lockState,
    isLoading: isPending,
    isError,
    canEditEvent: hasEventContentManagePermission(event),
    isSaveModalOpen,
    isCancelModalOpen,
    cancelReason,
    pendingPolicyChange,
    isSavePending: updateDetailsMutation.isPending,
    isCancelPending: cancelMutation.isPending,
    handleChange,
    handleDateChange,
    handleCategoryToggle,
    handleLocationTextChange,
    handleLocationChange,
    handleSkillAdd,
    handleSkillChange,
    handleSkillRemove,
    handlePolicyChange,
    handlePolicyConfirm,
    handleAttendanceToggle,
    handleRadiusChange,
    handleRadiusClear,
    handleDiscard,
    handleSave,
    handleSaveConfirm,
    navigateToEvent,
    setIsSaveModalOpen,
    setIsCancelModalOpen,
    setCancelReason,
    setPendingPolicyChange,
    cancelEvent: cancelMutation.mutate,
  };
};
