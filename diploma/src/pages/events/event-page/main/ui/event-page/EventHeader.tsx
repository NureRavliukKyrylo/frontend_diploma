import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import type { Event } from "@entities/event";
import { ModerationSubjectType } from "@entities/report";
import { ReportButton } from "@features/moderation";
import { Arrow } from "@shared/assets/icons/actions";
import { LinkButtonWrapper } from "@shared/ui/buttons";
import type { useEventPage } from "../../model/useEventPage";
import { EventMetaChips } from "./EventMetaChips";
import { EventParticipation } from "./EventParticipation";
import { EventStats } from "./EventStats";
import styles from "../EventPage.module.scss";

interface EventHeaderProps {
  event: Event;
  policyConfig: ReturnType<typeof useEventPage>["policyConfig"];
}

export const EventHeader = ({ event, policyConfig }: EventHeaderProps) => {
  const { t } = useTranslation(["event"]);

  return (
    <motion.div
      className={styles.eventPageHeader}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.headerEventInfo}>
        <div className={styles.reportWrapper}>
          <ReportButton
            subjectType={ModerationSubjectType.Event}
            subjectId={event.id}
          />
        </div>
        <div className={styles.mainEventData}>
          <div className={styles.eventOrganizationInfo}>
            <div className={styles.titleHeader}>
              <h1>{event.title}</h1>
              <EventMetaChips event={event} policyConfig={policyConfig} />
            </div>
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
            >
              <LinkButtonWrapper
                to="/organizations/$id"
                params={{ id: event.organization?.id }}
                className={styles.organizationInfo}
              >
                <img
                  src={event.organization?.logoUrl ?? undefined}
                  alt="organization-image"
                />
                <p>{event.organization?.name}</p>
              </LinkButtonWrapper>
            </motion.div>
          </div>
          {event.project ? (
            <div className={styles.projectPill}>
              <h1>{t("event:labels.project")}</h1>
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <LinkButtonWrapper
                  to="/projects/$id"
                  params={{ id: event.project.id }}
                  className={styles.goToProject}
                >
                  <Arrow className={styles.toProjectArrow} />
                </LinkButtonWrapper>
              </motion.div>
            </div>
          ) : null}
        </div>
      </div>
      <EventStats event={event} />
      <EventParticipation event={event} />
    </motion.div>
  );
};
