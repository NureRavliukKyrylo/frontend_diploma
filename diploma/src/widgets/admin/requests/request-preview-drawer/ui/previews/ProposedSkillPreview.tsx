import type { AdminRequestListItem } from "@entities/admin";
import { getRequestInitials } from "../../../requests-config/libs/requestDrawerHelpers";
import type { CategoryNameMap } from "../../../requests-config/libs/requestTypeConfig";
import {
  asRequestRecord,
  readPayloadString,
  readPayloadStringArray,
} from "../../../requests-config/libs/requestPayloadParsing";
import styles from "../../../requests-page-styles/AdminRequestsPage.module.scss";
import { useTranslation } from "react-i18next";

interface ProposedSkillPreviewProps {
  request: AdminRequestListItem;
  categoryMap: CategoryNameMap;
}

export const ProposedSkillPreview = ({
  request,
  categoryMap,
}: ProposedSkillPreviewProps) => {
  const { t } = useTranslation("admin");
  const requestData = asRequestRecord(request.dataJson);
  const name =
    readPayloadString(requestData, ["name", "Name", "title", "Title"]) ||
    request.title;
  const description =
    readPayloadString(requestData, ["description", "Description"]) ||
    request.description ||
    t("requests.previews.noDescription");
  const iconUrl = readPayloadString(requestData, [
    "iconUrl",
    "IconUrl",
    "imageUrl",
    "ImageUrl",
  ]);
  const categoryIds = readPayloadStringArray(requestData, [
    "categoryIds",
    "CategoryIds",
  ]);
  const categories = categoryIds.map((id) => categoryMap.get(id) ?? id);

  return (
    <>
      <div className={styles.proposedSkillPreview}>
        <span className={styles.proposedSkillIcon}>
          {iconUrl ? (
            <img src={iconUrl} alt={name} />
          ) : (
            getRequestInitials(name)
          )}
        </span>
        <div className={styles.proposedSkillMain}>
          <strong>{name}</strong>
          <span>{t("requests.previews.proposedSkill")}</span>
        </div>
      </div>

      <section className={styles.drawerSection}>
        <div className={styles.drawerSectionLabel}>
          {t("requests.previews.description")}
        </div>
        <p className={styles.drawerParagraph}>{description}</p>
      </section>

      <section className={styles.drawerSection}>
        <div className={styles.drawerSectionLabel}>
          {t("requests.previews.categories")}
        </div>
        {categories.length > 0 ? (
          <div className={styles.drawerPills}>
            {categories.map((category) => (
              <span key={category}>{category}</span>
            ))}
          </div>
        ) : (
          <p className={styles.drawerMutedText}>
            {t("requests.previews.noCategories")}
          </p>
        )}
      </section>
    </>
  );
};
