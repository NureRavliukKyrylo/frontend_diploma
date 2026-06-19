import { useParams } from "@tanstack/react-router";
import { OrganizationSettingsWidget } from "@widgets/organizations";
import styles from "./SettingsOrganizationPage.module.scss";

export const SettingsOrganizationPage = () => {
  const { id } = useParams({ from: "/_masterLayout/organizations/$id/settings/" });

  return (
    <div className={styles.page}>
      <OrganizationSettingsWidget organizationId={id} />
    </div>
  );
};
