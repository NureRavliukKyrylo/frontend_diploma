import { useQuery } from "@tanstack/react-query";
import { eventQuery } from "@entities/event";
import { EventFab, EventSettingsWidget } from "@widgets/events";
import { useParams } from "@tanstack/react-router";
import styles from "./SettingsEventPage.module.scss";

export const SettingsEventPage = () => {
  const { id } = useParams({ from: "/_masterLayout/events/$id/settings/" });
  const { data: event } = useQuery(eventQuery.id(id));

  return (
    <>
      <section className={styles.page}>
        <EventSettingsWidget eventId={id} />
      </section>
      {event ? (
        <EventFab
          eventId={id}
          event={event}
          activeTab={undefined}
          onTabChange={undefined}
        />
      ) : null}
    </>
  );
};
