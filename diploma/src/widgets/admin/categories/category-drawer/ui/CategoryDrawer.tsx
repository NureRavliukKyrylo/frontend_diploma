import { ExternalLink, Image, Pencil, Trash2, X } from "lucide-react";
import {
  categoryFallbackGradient,
  type AdminCategoryCardData,
} from "../../lib/categoryVisuals";
import styles from "./CategoryDrawer.module.scss";
import { useTranslation } from "react-i18next";

interface CategoryDrawerProps {
  category: AdminCategoryCardData | null;
  onClose: () => void;
  onEdit: (category: AdminCategoryCardData) => void;
  onDelete: (category: AdminCategoryCardData) => void;
  onChangeImage: (category: AdminCategoryCardData) => void;
}

export const CategoryDrawer = ({
  category,
  onClose,
  onEdit,
  onDelete,
  onChangeImage,
}: CategoryDrawerProps) => {
  const { t } = useTranslation("admin");
  if (!category) {
    return null;
  }

  return (
    <div className={styles.drawerBackdrop} onClick={onClose}>
      <aside
        className={styles.drawer}
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className={styles.drawerHero}
          style={{
            backgroundImage: category.imageUrl
              ? `url(${category.imageUrl})`
              : categoryFallbackGradient,
          }}
        >
          <div className={styles.heroScrim} />
          <button
            type="button"
            className={styles.drawerClose}
            onClick={onClose}
            aria-label={t("categories.drawer.close")}
          >
            <X size={18} aria-hidden="true" />
          </button>

          <div className={styles.heroContent}>
            <div className={styles.heroEyebrow}>
              {t("categories.drawer.category")}
            </div>
            <div className={styles.drawerTitle}>{category.name}</div>
            <div className={styles.drawerMeta}>
              {t("categories.drawer.id")} {category.id}
            </div>
          </div>

          <button
            type="button"
            className={styles.coverImageChange}
            onClick={() => onChangeImage(category)}
          >
            <Pencil size={13} aria-hidden="true" />
            {t("common.actions.change")}
          </button>
        </div>

        <div className={styles.drawerBody}>
          <div className={styles.infoGrid}>
            <div className={styles.infoTile}>
              <span className={styles.infoLabel}>
                {t("categories.drawer.recordId")}
              </span>
              <strong className={styles.infoValue}>{category.id}</strong>
            </div>
            <div className={styles.infoTile}>
              <span className={styles.infoLabel}>
                {t("categories.drawer.image")}
              </span>
              <strong className={styles.infoValue}>
                {category.imageUrl
                  ? t("categories.drawer.configured")
                  : t("categories.drawer.fallback")}
              </strong>
            </div>
          </div>

          <section className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionIcon}>
                <Image size={18} aria-hidden="true" />
              </span>
              <div>
                <div className={styles.sectionLabel}>
                  {t("categories.drawer.description")}
                </div>
                <p className={styles.description}>
                  {category.description || t("categories.drawer.noDescription")}
                </p>
              </div>
            </div>
          </section>

          {category.imageUrl ? (
            <section className={styles.sectionCard}>
              <div className={styles.sectionLabel}>
                {t("categories.drawer.imageUrl")}
              </div>
              <div className={styles.urlRow}>
                <span className={styles.imageUrl}>{category.imageUrl}</span>
                <a
                  className={styles.urlAction}
                  href={category.imageUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t("categories.drawer.openImage")}
                >
                  <ExternalLink size={15} aria-hidden="true" />
                </a>
              </div>
            </section>
          ) : (
            <section className={styles.sectionCard}>
              <div className={styles.sectionLabel}>
                {t("categories.drawer.imageUrl")}
              </div>
              <p className={styles.emptyText}>
                {t("categories.drawer.defaultImage")}
              </p>
            </section>
          )}
        </div>

        <div className={styles.drawerFooter}>
          <button
            type="button"
            className={styles.deleteButton}
            onClick={() => onDelete(category)}
          >
            <Trash2 size={17} aria-hidden="true" />
            {t("common.actions.delete")}
          </button>
          <button
            type="button"
            className={styles.editButton}
            onClick={() => onEdit(category)}
          >
            <Pencil size={17} aria-hidden="true" />
            {t("categories.drawer.edit")}
          </button>
        </div>
      </aside>
    </div>
  );
};
