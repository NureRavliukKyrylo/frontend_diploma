import { useTranslation } from "react-i18next";
import type { PublicAvailabilitySlot } from "@entities/user/profile";
import { ProfileSectionCard } from "./ProfileSectionCard";
import styles from "./PublicProfileAvailability.module.scss";

const dayKeys = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;

const formatTime = (value: string | null) => {
  if (!value) return "";
  const match = value.match(/(\d{2}:\d{2})/);
  return match?.[1] ?? value;
};

const describeSlot = (slot: PublicAvailabilitySlot, allDayLabel: string) => {
  if (slot.allDay) return allDayLabel;
  return `${formatTime(slot.startTime)} - ${formatTime(slot.endTime)}`;
};

export const PublicProfileAvailability = ({
  slots,
}: {
  slots: PublicAvailabilitySlot[];
}) => {
  const { t, i18n } = useTranslation("common");
  const recurringSlots = slots.filter((slot) => slot.dayOfWeek !== null);
  const datedSlots = slots.filter((slot) => slot.date);
  const intlLocale =
    i18n.language === "uk" || i18n.language === "ua" ? "uk-UA" : "en-US";
  const allDayLabel = t("publicProfile.availability.allDay");

  return (
    <ProfileSectionCard title={t("publicProfile.sections.availability")}>
      {recurringSlots.length > 0 && (
        <div className={styles.week}>
          {dayKeys.map((day, index) => {
            const daySlots = recurringSlots.filter(
              (slot) => slot.dayOfWeek === index && slot.isAvailable,
            );

            return (
              <div
                key={day}
                className={`${styles.day} ${
                  daySlots.length > 0 ? styles.dayAvailable : ""
                }`}
              >
                <strong>
                  {t(`publicProfile.availability.days.${day}`)}
                </strong>
                <span>
                  {daySlots.length > 0
                    ? daySlots
                        .map((slot) => describeSlot(slot, allDayLabel))
                        .join(", ")
                    : t("publicProfile.availability.notSet")}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {datedSlots.length > 0 && (
        <div className={styles.dates}>
          {datedSlots.map((slot) => (
            <div key={slot.id ?? `${slot.date}-${slot.startTime}`}>
              <strong>
                {new Intl.DateTimeFormat(intlLocale, {
                  dateStyle: "medium",
                }).format(new Date(`${slot.date}T00:00:00`))}
              </strong>
              <span>
                {slot.isAvailable
                  ? describeSlot(slot, allDayLabel)
                  : t("publicProfile.availability.unavailable")}
              </span>
            </div>
          ))}
        </div>
      )}

      {slots.length === 0 && (
        <p className={styles.empty}>
          {t("publicProfile.availability.empty")}
        </p>
      )}
    </ProfileSectionCard>
  );
};
