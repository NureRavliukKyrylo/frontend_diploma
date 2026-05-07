import { Close } from "@shared/assets/icons/actions";
import styles from "./SetAvailabilityForm.module.scss";
import {
  formatDateToText,
  formatDateToTime,
  formatDayOfWeek,
} from "@shared/libs/date";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { Checkbox, TimeRangePicker } from "@shared/ui/inputs";
import { motion } from "framer-motion";

interface SetAvailabilityFormProps {
  date: Date;
  start?: string;
  end?: string;
  onClose: () => void;
}

export const SetAvailabilityForm = ({
  date,
  end,
  start,
  onClose,
}: SetAvailabilityFormProps) => {
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
          {formatDayOfWeek(date)}, {formatDateToText(date.toISOString())}
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
      <form className={styles.formSetAvailability}>
        <div className={styles.timeRangeBlock}>
          <div className={styles.setRange}>
            <h1>Set time-range availability</h1>
            <div className={styles.optionsToChose}>
              <div className={styles.timeRangeWrapper}>
                <TimeRangePicker
                  value={[
                    formatDateToTime(date, start),
                    formatDateToTime(date, end),
                  ]}
                />
              </div>
              <button className={styles.allDay} type="button">
                All Day
              </button>
            </div>
          </div>
          <div className={styles.setRecurrence}>
            <Checkbox name="isRecurrence">
              <h1>
                Are you usually not available on {formatDayOfWeek(date)}s?
              </h1>
            </Checkbox>
          </div>
        </div>
        <div className={styles.actionsBlock}>
          <BaseButtonWrapper className={styles.setAvailability} type="submit">
            Set availability
          </BaseButtonWrapper>
          <BaseButtonWrapper
            className={styles.cancelButton}
            onClick={onClose}
            type="button"
          >
            Cancel
          </BaseButtonWrapper>
        </div>
      </form>
    </motion.div>
  );
};
