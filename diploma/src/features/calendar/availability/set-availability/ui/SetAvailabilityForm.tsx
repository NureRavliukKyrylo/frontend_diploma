import { Close } from "@shared/assets/icons/actions";
import styles from "./SetAvailabilityForm.module.scss";
import { formatDateToText, formatDayOfWeek } from "@shared/libs/date";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { TimeRangePicker } from "@shared/ui/inputs";
import { motion } from "framer-motion";
import { useAvailabilityForm } from "../model/useAvailabilityForm";
import type { AvailabilitySlot } from "@entities/user/calendar";
import { DateRangePicker, type RangeValue } from "@heroui/react";
import { useTranslation } from "react-i18next";
import {
  getLocalTimeZone,
  parseDate,
  today,
  type DateValue,
} from "@internationalized/date";
import dayjs from "dayjs";

interface SetAvailabilityFormProps {
  date: Date;
  availability?: AvailabilitySlot;
  onClose: () => void;
}

export const SetAvailabilityForm = ({
  date,
  availability,
  onClose,
}: SetAvailabilityFormProps) => {
  const { t, i18n } = useTranslation(["calendar"]);
  const { formik, isUpdate, isLoading, handleAllDayToggle, mutation } =
    useAvailabilityForm({ date, availability, onClose });

  const handleClose = () => {
    formik.resetForm();
    mutation.reset();
    onClose();
  };

  const dateRangeValue = formik.values.dateRange
    ? {
        start: parseDate(formik.values.dateRange[0]),
        end: parseDate(formik.values.dateRange[1]),
      }
    : null;

  const handleDateRangeChange = (range: RangeValue<DateValue> | null) => {
    if (!range) {
      formik.setFieldValue("dateRange", null);
      return;
    }
    formik.setFieldValue("dateRange", [
      range.start.toString(),
      range.end.toString(),
    ]);
  };

  return (
    <motion.div
      className={styles.wrapperAvailabilityForm}
      initial={{ opacity: 0, scale: 0.95, y: -8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -8 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.headerForm}>
        <span>
          {formatDayOfWeek(date, i18n.language as "en" | "ua")},{" "}
          {formatDateToText(date.toISOString(), i18n.language as "en" | "ua")}
        </span>
        <motion.div
          className={styles.closeWindow}
          onClick={onClose}
          whileHover={{ rotate: 90, scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <Close />
        </motion.div>
      </div>
      <form
        className={styles.formSetAvailability}
        onSubmit={formik.handleSubmit}
      >
        <div className={styles.setRangeWrapper}>
          <div className={styles.dateRangeBlock}>
            <h1>{t("calendar:labels.dateRangeOptional")}</h1>
            <DateRangePicker
              value={dateRangeValue}
              onChange={handleDateRangeChange}
              minValue={today(getLocalTimeZone())}
              granularity="day"
              classNames={{
                base: "w-[70%] rounded-[20px] border border-[#d4d4d8] hover:border-[#3f3f46] data-[focus-within=true]:border-[#18181b] [&_[data-type=literal]]:text-[rgba(0,0,0,0.4)] data-[focus-within=true]:[&_[data-type=literal]]:!text-[rgba(0,0,0,0.87)]",
                inputWrapper:
                  "w-full h-full rounded-[20px] shadow-none border-none !bg-white data-[hover=true]:!bg-white data-[focus=true]:!bg-white data-[focus-within=true]:!bg-white ",
                segment:
                  "!text-[rgba(0,0,0,0.87)] data-[placeholder=true]:!text-[rgba(0,0,0,0.4)] data-[type=literal]:!text-[rgba(0,0,0,0.4)] text-[17px] font-[500]",
                separator: "!text-[rgba(0,0,0,0.4)]",
                selectorIcon: "text-[#71717a]",
                calendar: "!overflow-hidden [&>*]:!overflow-hidden",
              }}
            />
          </div>
          <div className={styles.timeRangeBlock}>
            <div className={styles.setRange}>
              <h1>{t("calendar:labels.setTimeRangeAvailability")}</h1>
              <div className={styles.optionsToChose}>
                <div className={styles.timeRangeWrapper}>
                  <TimeRangePicker
                    value={[
                      formik.values.startTime
                        ? dayjs(formik.values.startTime, "HH:mm")
                        : null,
                      formik.values.endTime
                        ? dayjs(formik.values.endTime, "HH:mm")
                        : null,
                    ]}
                    onChange={([start, end]) => {
                      formik.setFieldValue(
                        "startTime",
                        start ? start.format("HH:mm:ss[Z]") : "",
                      );
                      formik.setFieldValue(
                        "endTime",
                        end ? end.format("HH:mm:ss[Z]") : "",
                      );
                    }}
                    disabled={formik.values.allDay}
                  />
                </div>
                <motion.button
                  className={`${styles.allDay} ${formik.values.allDay ? styles.allDayActive : ""}`}
                  type="button"
                  onClick={handleAllDayToggle}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  {t("calendar:actions.allDay")}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.actionsErrorWrapper}>
          <div className={styles.actionsBlock}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <BaseButtonWrapper
                className={styles.setAvailability}
                type="submit"
                loading={isLoading}
              >
                {isUpdate
                  ? t("calendar:actions.updateAvailability")
                  : t("calendar:actions.setAvailability")}
              </BaseButtonWrapper>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <BaseButtonWrapper
                className={styles.cancelButton}
                onClick={handleClose}
                type="button"
              >
                {t("calendar:actions.cancel")}
              </BaseButtonWrapper>
            </motion.div>
          </div>
          {!formik.values.allDay &&
            formik.touched.startTime &&
            formik.errors.startTime && (
              <div className="errorMessage">{formik.errors.startTime}</div>
            )}
        </div>
      </form>
    </motion.div>
  );
};
