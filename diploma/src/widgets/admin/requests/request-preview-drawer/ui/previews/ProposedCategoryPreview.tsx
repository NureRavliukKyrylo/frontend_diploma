import type { AdminRequestListItem } from "@entities/admin";
import {
  asRequestRecord,
  readPayloadString,
} from "../../../requests-config/libs/requestPayloadParsing";
import styles from "../../../requests-page-styles/AdminRequestsPage.module.scss";

interface ProposedCategoryPreviewProps {
  request: AdminRequestListItem;
}

export const ProposedCategoryPreview = ({
  request,
}: ProposedCategoryPreviewProps) => {
  const data = asRequestRecord(request.dataJson);
  const name =
    readPayloadString(data, ["name", "Name", "title", "Title"]) || request.title;
  const description =
    readPayloadString(data, ["description", "Description"]) ||
    request.description ||
    "No description provided.";
  const imageUrl = readPayloadString(data, ["imageUrl", "ImageUrl"]);

  return (
    <>
      {imageUrl && (
        <div className={styles.proposedCategoryImage}>
          <img src={imageUrl} alt={name} />
        </div>
      )}
      <section className={styles.drawerSection}>
        <div className={styles.drawerSectionLabel}>Proposed category</div>
        <div className={styles.proposedCategoryCard}>
          <strong>{name}</strong>
          <p>{description}</p>
        </div>
      </section>
    </>
  );
};
