import { AnimatePresence, motion } from "framer-motion";
import { Switch } from "@shared/ui";
import type { CreateEventRecurrence } from "../../api/createEventApi";
import type {
  CreateEventFormErrors,
  CreateEventFormState,
} from "../../model/useCreateEventForm";
import { RecurrenceFields } from "./recurrence-step/RecurrenceFields";
import { safelyParseDate } from "./recurrence-step/datePicker";
import styles from "./CreateEventSteps.module.scss";

interface RecurrenceStepProps {
  values: Pick<CreateEventFormState, "recurrence" | "startAt">;
  errors: CreateEventFormErrors;
  onChange: (patch: Partial<CreateEventRecurrence> | null) => void;
}

export const RecurrenceStep = ({
  values,
  errors,
  onChange,
}: RecurrenceStepProps) => {
  const recurrence = values.recurrence;
  const isRecurring = recurrence?.enabled ?? false;
  const minimumUntilDate = safelyParseDate(values.startAt);

  return (
    <div className={styles.stepContent}>
      <div className={styles.formCard}>
        <section className={styles.fieldBlock}>
          <h2 className={styles.blockLabel}>Recurring event</h2>
          <div className={styles.recurringToggleRow}>
            <Switch
              isSelected={isRecurring}
              onValueChange={(checked) =>
                onChange(
                  checked
                    ? {
                        enabled: true,
                        frequency: recurrence?.frequency ?? "weekly",
                        interval: recurrence?.interval ?? 1,
                        until: recurrence?.until ?? "",
                      }
                    : null,
                )
              }
            />
          </div>

          <AnimatePresence initial={false}>
            {isRecurring ? (
              <motion.div
                key="recurrence-fields"
                className={styles.recurrenceFields}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                <RecurrenceFields
                  recurrence={recurrence}
                  errors={errors}
                  minimumUntilDate={minimumUntilDate}
                  onChange={onChange}
                />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
};
