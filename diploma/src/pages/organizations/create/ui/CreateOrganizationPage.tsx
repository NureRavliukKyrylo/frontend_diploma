import { OrganizationCreateFlowWidget } from "@widgets/organizations/create";
import styles from "./CreateOrganizationPage.module.scss";

export const CreateOrganizationPage = () => {
  return (
    <div className={styles.page}>
      <OrganizationCreateFlowWidget />
    </div>
  );
};
