import { EventSettingsWidget } from "@widgets/events";
import { useParams } from "@tanstack/react-router";
import styles from "./SettingsEventPage.module.scss";

export const SettingsEventPage = () => {
  const { id } = useParams({ from: "/_masterLayout/events/$id/settings/" });

  return (
    <section className={styles.page}>
      <EventSettingsWidget eventId={id} />
    </section>
  );
};
