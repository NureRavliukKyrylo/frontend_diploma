import { ExternalLink, Image, Pencil, Trash2, X } from "lucide-react";
import {
  categoryFallbackGradient,
  type AdminCategoryCardData,
} from "../../lib/categoryVisuals";
import styles from "./CategoryDrawer.module.scss";

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
  if (!category) {
    return null;
  }

  return (
    <div className={styles.drawerBackdrop} onClick={onClose}>
      <aside className={styles.drawer} onClick={(event) => event.stopPropagation()}>
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
            aria-label="Close category details"
          >
            <X size={18} aria-hidden="true" />
          </button>

          <div className={styles.heroContent}>
            <div className={styles.heroEyebrow}>Category</div>
            <div className={styles.drawerTitle}>{category.name}</div>
            <div className={styles.drawerMeta}>ID {category.id}</div>
          </div>

          <button
            type="button"
            className={styles.coverImageChange}
            onClick={() => onChangeImage(category)}
          >
            <Pencil size={13} aria-hidden="true" />
            Change
          </button>
        </div>

        <div className={styles.drawerBody}>
          <div className={styles.infoGrid}>
            <div className={styles.infoTile}>
              <span className={styles.infoLabel}>Record ID</span>
              <strong className={styles.infoValue}>{category.id}</strong>
            </div>
            <div className={styles.infoTile}>
              <span className={styles.infoLabel}>Image</span>
              <strong className={styles.infoValue}>
                {category.imageUrl ? "Configured" : "Fallback"}
              </strong>
            </div>
          </div>

          <section className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionIcon}>
                <Image size={18} aria-hidden="true" />
              </span>
              <div>
                <div className={styles.sectionLabel}>Description</div>
                <p className={styles.description}>
                  {category.description || "No description has been added yet."}
                </p>
              </div>
            </div>
          </section>

          {category.imageUrl ? (
            <section className={styles.sectionCard}>
              <div className={styles.sectionLabel}>Image URL</div>
              <div className={styles.urlRow}>
                <span className={styles.imageUrl}>{category.imageUrl}</span>
                <a
                  className={styles.urlAction}
                  href={category.imageUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open category image"
                >
                  <ExternalLink size={15} aria-hidden="true" />
                </a>
              </div>
            </section>
          ) : (
            <section className={styles.sectionCard}>
              <div className={styles.sectionLabel}>Image URL</div>
              <p className={styles.emptyText}>
                This category uses the default gradient until an image URL is added.
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
            Delete
          </button>
          <button
            type="button"
            className={styles.editButton}
            onClick={() => onEdit(category)}
          >
            <Pencil size={17} aria-hidden="true" />
            Edit category
          </button>
        </div>
      </aside>
    </div>
  );
};
