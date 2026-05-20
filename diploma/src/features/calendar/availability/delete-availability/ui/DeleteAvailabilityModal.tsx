import { ConfirmationModal } from "@shared/ui/modals";
import { DeleteModal } from "@shared/assets/images/actions";
import styles from "./DeleteAvailabilityModal.module.scss";
import type { AvailabilitySlot } from "@entities/user/calendar";
import { useDeleteAvailability } from "../model/useDeleteAvailability";
import { formatDateToText, formatDayOfWeek } from "@shared/libs/date";

const dayName = (dayOfWeek: number): string => {
  const date = new Date(0);
  date.setDate(date.getDate() - date.getDay() + dayOfWeek);
  return new Intl.DateTimeFormat("en-GB", { weekday: "long" }).format(date);
};

const buildDescription = (slot: AvailabilitySlot): string => {
  const timeLabel = slot.allDay
    ? "All Day"
    : `${slot.startTime} – ${slot.endTime}`;

  if (slot.date) {
    const date = new Date(slot.date);
    return `${formatDayOfWeek(date)}, ${formatDateToText(date.toISOString())}, ${timeLabel}`;
  }

  if (slot.startDate && slot.endDate) {
    const from = formatDateToText(slot.startDate);
    const to = formatDateToText(slot.endDate);

    const recurrence =
      slot.dayOfWeek !== null
        ? `Every ${dayName(slot.dayOfWeek)}`
        : "Every day";

    return `${recurrence}, from ${from} to ${to}, ${timeLabel}`;
  }

  return timeLabel;
};

interface DeleteAvailabilityModalProps {
  slot: AvailabilitySlot;
  isOpen: boolean;
  onClose: () => void;
}

export const DeleteAvailabilityModal = ({
  slot,
  isOpen,
  onClose,
}: DeleteAvailabilityModalProps) => {
  const { handleDelete, isLoading, errorMessage } =
    useDeleteAvailability(onClose);

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onCancel={onClose}
      onConfirm={() => handleDelete(slot.id)}
      confirmText="Delete"
      title="Delete Availability Slot"
      text={`Are you sure you want to remove this availability?\n\n${buildDescription(slot)}\n\nThis action cannot be undone.`}
      cancelText="Cancel"
      error={errorMessage}
      isLoading={isLoading}
      confirmButtonClassName={styles.confirmButton}
      image={DeleteModal}
      imageClassName={styles.imageDelete}
      maxWidth="600px"
    />
  );
};
