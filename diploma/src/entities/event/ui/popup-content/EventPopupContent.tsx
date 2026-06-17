import { Link } from "@tanstack/react-router";
import type { Event } from "../../model";
import styles from "./EventPopupContent.module.scss";
import { useTranslation } from "react-i18next";

interface EventPopupContentProps {
  event: Event;
}

export const EventPopupContent = ({ event }: EventPopupContentProps) => {
  const { t } = useTranslation("common");
  return (
    <div className={styles.popupEventContent}>
      <div className={styles.eventInfo}>
        <h1>{event.title}</h1>
        <p>{event.description}</p>
        <Link
          to="/events/$id"
          params={{ id: event.id }}
          className={styles.seeMoreButtonEvent}
        >
          {t("actions.seeMore")}
        </Link>
      </div>
    </div>
  );
};
