import { ConfirmationModal } from "@shared/ui/modals";
import { DeleteModal } from "@shared/assets/images/actions";
import styles from "./DeleteAvailabilityModal.module.scss";
import type { AvailabilitySlot } from "@entities/user/calendar";
import { useDeleteAvailability } from "../model/useDeleteAvailability";
import { formatDateToText, formatDayOfWeek } from "@shared/libs/date";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";

const getDayName = (dayOfWeek: number, locale: string): string => {
  const date = new Date(0);
  date.setDate(date.getDate() - date.getDay() + dayOfWeek);
  return new Intl.DateTimeFormat(locale, { weekday: "long" }).format(date);
};

const buildDescription = (
  slot: AvailabilitySlot,
  t: TFunction,
  locale: string,
): string => {
  const timeLabel = slot.allDay
    ? t("calendar:deleteModal.allDay")
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
        ? t("calendar:deleteModal.everyWeekDay", {
            day: getDayName(slot.dayOfWeek, locale),
          })
        : t("calendar:deleteModal.everyDay");

    const dateRangeStr = t("calendar:deleteModal.timeRangePattern", {
      from,
      to,
    });

    return `${recurrence}, ${dateRangeStr}, ${timeLabel}`;
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
  const { t, i18n } = useTranslation(["calendar", "common"]);
  const { handleDelete, isLoading, errorMessage } =
    useDeleteAvailability(onClose);

  const description = buildDescription(slot, t, i18n.language);

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onCancel={onClose}
      onConfirm={() => handleDelete(slot.id)}
      confirmText={t("common:actions.delete")}
      title={t("calendar:deleteModal.title")}
      text={t("calendar:deleteModal.textPattern", { description })}
      cancelText={t("calendar:actions.cancel")}
      error={errorMessage}
      isLoading={isLoading}
      confirmButtonClassName={styles.confirmButton}
      image={DeleteModal}
      imageClassName={styles.imageDelete}
      maxWidth="600px"
    />
  );
};
