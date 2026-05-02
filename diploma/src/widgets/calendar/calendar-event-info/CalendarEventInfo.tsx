import { useQuery } from "@tanstack/react-query";
import { EventCalendarDetail, eventQuery } from "@entities/event";
import { TaskCalendarDetail, taskQuery } from "@entities/task";
import type { EventType } from "@shared/config/types";
import { Close, NavigationArrow } from "@shared/assets/icons/actions";
import styles from "./CalendarEventInfo.module.scss";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import {
  useFloating,
  autoUpdate,
  flip,
  shift,
  offset,
} from "@floating-ui/react";
import { motion } from "framer-motion";

interface CalendarEventInfoProps {
  activityId: string;
  type: EventType;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  anchor: HTMLElement;
}

export const CalendarEventInfo = ({
  activityId,
  type,
  onClose,
  onPrev,
  onNext,
  anchor,
}: CalendarEventInfoProps) => {
  const { refs, floatingStyles } = useFloating({
    elements: { reference: anchor },
    whileElementsMounted: autoUpdate,
    placement: "left-start",
    middleware: [offset(12), flip(), shift({ padding: 8 })],
  });

  const { data: event, isLoading: isEventLoading } = useQuery({
    ...eventQuery.id(activityId),
    enabled: type === "event",
  });

  const { data: task, isLoading: isTaskLoading } = useQuery({
    ...taskQuery.id(activityId),
    enabled: type === "task",
  });

  const isLoading = isEventLoading || isTaskLoading;
  const title = event?.title ?? task?.title;

  return (
    <div
      ref={refs.setFloating}
      style={floatingStyles}
      className={styles.wrapperMain}
    >
      <motion.div
        className={styles.eventInfoWrapper}
        initial={{ opacity: 0, scale: 0.95, x: 8 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.95, x: 8 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <Close className={styles.closeWindow} onClick={onClose} />

        <div className={styles.infoEvent}>
          <div className={styles.headerInfo}>
            <h1>{title}</h1>

            <div className={styles.navigationsBlock}>
              {onPrev && (
                <button
                  className={styles.prevButton}
                  onClick={onPrev}
                  disabled={!onPrev}
                >
                  <NavigationArrow />
                </button>
              )}
              {onNext && (
                <button
                  className={styles.nextButton}
                  onClick={onNext}
                  disabled={!onNext}
                >
                  <NavigationArrow />
                </button>
              )}
            </div>
          </div>

          {isLoading ? (
            <div className={styles.skeleton} />
          ) : type === "event" && event ? (
            <>
              <EventCalendarDetail event={event} />
              <div className={styles.bottomContent}>
                <h1>Will you be attending the event?</h1>
                <div className={styles.actions}>
                  <BaseButtonWrapper className={styles.attendingAgree}>
                    Yes
                  </BaseButtonWrapper>
                  <BaseButtonWrapper className={styles.attendingDisagree}>
                    No
                  </BaseButtonWrapper>
                </div>
              </div>
            </>
          ) : task ? (
            <TaskCalendarDetail task={task} />
          ) : null}
        </div>
      </motion.div>
    </div>
  );
};
