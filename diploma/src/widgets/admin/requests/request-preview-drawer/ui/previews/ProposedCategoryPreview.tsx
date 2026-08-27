import type { AdminRequestListItem } from "@entities/admin";
import {
  asRequestRecord,
  readPayloadString,
} from "../../../requests-config/libs/requestPayloadParsing";
import styles from "../../../requests-page-styles/AdminRequestsPage.module.scss";
import { useTranslation } from "react-i18next";

interface ProposedCategoryPreviewProps {
  request: AdminRequestListItem;
}

export const ProposedCategoryPreview = ({
  request,
}: ProposedCategoryPreviewProps) => {
  const { t } = useTranslation("admin");
  const requestData = asRequestRecord(request.dataJson);
  const name =
    readPayloadString(requestData, ["name", "Name", "title", "Title"]) ||
    request.title;
  const description =
    readPayloadString(requestData, ["description", "Description"]) ||
    request.description ||
    t("requests.previews.noDescription");
  const imageUrl = readPayloadString(requestData, ["imageUrl", "ImageUrl"]);

  return (
    <>
      {imageUrl && (
        <div className={styles.proposedCategoryImage}>
          <img src={imageUrl} alt={name} />
        </div>
      )}
      <section className={styles.drawerSection}>
        <div className={styles.drawerSectionLabel}>
          {t("requests.previews.proposedCategory")}
        </div>
        <div className={styles.proposedCategoryCard}>
          <strong>{name}</strong>
          <p>{description}</p>
        </div>
      </section>
    </>
  );
};
