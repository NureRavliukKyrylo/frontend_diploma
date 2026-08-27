import { AnimatePresence, motion } from "framer-motion";
import type { Event, EventJoinedMode, EventMode } from "@entities/event";
import { CreateTaskDrawer } from "@features/task/create-task";
import { useTranslation } from "react-i18next";
import { useEventFabActions } from "./model/useEventFabActions";
import { EventFabActionStack } from "./ui/EventFabActionStack";
import { EventFabMainButton } from "./ui/EventFabMainButton";
import styles from "@widgets/organizations/details/ui/OrganizationFab/OrganizationFab.module.scss";

interface EventFabProps {
  eventId: string;
  event: Event;
  activeTab?: EventMode | EventJoinedMode;
  onTabChange?: (nextTab: "overview") => void;
}

export const EventFab = (props: EventFabProps) => {
  const { t } = useTranslation(["event"]);
  const model = useEventFabActions(props);

  if (!model.isVisible) return null;

  return (
    <>
      <AnimatePresence>
        {model.isOpen ? (
          <motion.button
            type="button"
            className={styles.backdrop}
            aria-label={t("fab.closeActions")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={model.closeMenu}
          />
        ) : null}
      </AnimatePresence>

      <div className={styles.fabRoot}>
        <AnimatePresence>
          {model.isOpen ? (
            <EventFabActionStack event={props.event} model={model} />
          ) : null}
        </AnimatePresence>

        <EventFabMainButton
          isOpen={model.isOpen}
          onClick={() => model.setIsOpen((current) => !current)}
        />
      </div>

      {props.event.organizationId ? (
        <CreateTaskDrawer
          isOpen={model.isTaskDrawerOpen}
          onClose={model.closeTaskDrawer}
          organizationId={props.event.organizationId}
          projectId={props.event.projectId ?? undefined}
          eventId={props.eventId}
          orgName={props.event.organization?.name}
        />
      ) : null}
    </>
  );
};
