import { useQuery } from "@tanstack/react-query";
import { EventCalendarDetail, eventQuery } from "@entities/event";
import { TaskCalendarDetail, taskQuery } from "@entities/task";
import { OfferCalendarDetail, offerQuery } from "@entities/offer";
import type { EventType } from "@shared/config/types";
import { Close, NavigationArrow } from "@shared/assets/icons/actions";
import styles from "./CalendarEventInfo.module.scss";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { AnimatePresence, motion } from "framer-motion";
import { BasePopover } from "@shared/ui/modals";
import { CalendarDetailSkeleton } from "./CalendarDetailSkeleton";
import { useMediaQuery } from "usehooks-ts";

interface CalendarEventInfoProps {
  activityId: string;
  title: string;
  type: EventType;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  anchor: Element | { getBoundingClientRect: () => DOMRect };
}

export const CalendarEventInfo = ({
  activityId,
  title,
  type,
  onClose,
  onPrev,
  onNext,
  anchor,
}: CalendarEventInfoProps) => {
  const isTablet = useMediaQuery("(max-width: 900px)");

  const { data: event, isLoading: isEventLoading } = useQuery({
    ...eventQuery.id(activityId),
    enabled: type === "event",
  });

  const { data: task, isLoading: isTaskLoading } = useQuery({
    ...taskQuery.id(activityId),
    enabled: type === "task",
  });

  const { data: offer, isLoading: isOfferLoading } = useQuery({
    ...offerQuery.id(activityId),
    enabled: type === "offer",
  });

  const isLoading = isEventLoading || isTaskLoading || isOfferLoading;

  return (
    <BasePopover
      anchor={anchor}
      onClose={onClose}
      placement={isTablet ? "bottom-start" : "right"}
      center={isTablet}
    >
      <motion.div
        className={styles.eventInfoWrapper}
        initial={{ opacity: 0, scale: 0.95, x: 8 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.95, x: 8 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.infoEvent}>
          <div className={styles.headerInfo}>
            <div className={styles.leftBlock}>
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
          <AnimatePresence mode="wait">
            <motion.div
              key={activityId}
              initial={{ opacity: 0, x: 20 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { duration: 0.25, ease: "easeOut" },
              }}
              exit={{
                opacity: 0,
                x: -20,
                transition: { duration: 0.2, ease: "easeIn" },
              }}
              className={styles.infoEvent}
            >
              {isLoading ? (
                <CalendarDetailSkeleton />
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
              ) : type === "task" && task ? (
                <>
                  <TaskCalendarDetail task={task} />
                  <div className={styles.bottomContent}>
                    <h1>Will you be completing the task?</h1>
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
              ) : type === "offer" && offer ? (
                <OfferCalendarDetail offer={offer} />
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </BasePopover>
  );
};
