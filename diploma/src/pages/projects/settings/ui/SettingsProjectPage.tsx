import { ProjectSettingsWidget } from "@widgets/projects";
import { useParams } from "@tanstack/react-router";
import styles from "./SettingsProjectPage.module.scss";

export const SettingsProjectPage = () => {
  const { id } = useParams({ from: "/_publicLayout/projects/$id/settings/" });

  return (
    <section className={styles.page}>
      <ProjectSettingsWidget projectId={id} />
    </section>
  );
};
