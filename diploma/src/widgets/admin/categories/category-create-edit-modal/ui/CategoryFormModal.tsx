import { BaseModal } from "@shared/ui/modals";
import { Check, ChevronDown, ChevronUp, Plus, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { AdminCategoryCardData } from "../../lib/categoryVisuals";
import { categoryFallbackGradient } from "../../lib/categoryVisuals";
import { useCategoryForm } from "../model/useCategoryForm";
import formStyles from "../../../skills/skill-create-edit-modal/ui/SkillFormModal.module.scss";
import styles from "./CategoryFormModal.module.scss";

interface CategoryFormModalProps {
  isOpen: boolean;
  mode: "create" | "edit";
  category?: AdminCategoryCardData | null;
  onClose: () => void;
}

export const CategoryFormModal = ({
  isOpen,
  mode,
  category,
  onClose,
}: CategoryFormModalProps) => {
  const { t } = useTranslation("admin");
  const [localizationOpen, setLocalizationOpen] = useState(false);
  const [imageBroken, setImageBroken] = useState(false);
  const { formik, isSubmitting } = useCategoryForm({
    mode,
    category,
    onSuccess: onClose,
  });
  const title =
    mode === "create"
      ? t("categories.form.createTitle")
      : t("categories.form.editTitle");
  const subtitle =
    mode === "create"
      ? t("categories.form.createSubtitle")
      : t("categories.form.editSubtitle");
  const imageUrl = formik.values.imageUrl.trim();
  const previewBackground =
    imageUrl && !imageBroken ? `url(${imageUrl})` : categoryFallbackGradient;

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="580px"
      showClosed={false}
    >
      <form className={formStyles.modalWrapper} onSubmit={formik.handleSubmit}>
        <button
          type="button"
          className={formStyles.closeButton}
          onClick={onClose}
          aria-label={t("categories.form.close")}
        >
          <X size={18} aria-hidden="true" />
        </button>

        <h2 className={formStyles.modalTitle}>{title}</h2>
        <p className={formStyles.modalSubtitle}>{subtitle}</p>

        <label className={formStyles.field}>
          <span className={formStyles.fieldLabel}>
            {t("categories.form.name")}{" "}
            <span className={formStyles.fieldRequired}>*</span>
          </span>
          <input
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={formStyles.fieldInput}
            maxLength={100}
          />
          {formik.touched.name && formik.errors.name && (
            <div className={formStyles.fieldError}>{formik.errors.name}</div>
          )}
        </label>

        <label className={formStyles.field}>
          <span className={formStyles.fieldLabel}>
            {t("categories.form.description")}
          </span>
          <textarea
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={formStyles.fieldTextarea}
            maxLength={1000}
          />
          <div className={formStyles.fieldMeta}>
            {formik.touched.description && formik.errors.description && (
              <span className={formStyles.fieldError}>
                {formik.errors.description}
              </span>
            )}
            <span className={formStyles.charCount}>
              {formik.values.description.length} / 1000
            </span>
          </div>
        </label>

        <label className={formStyles.field}>
          <span className={formStyles.fieldLabel}>
            {t("categories.form.imageUrl")}
          </span>
          <input
            name="imageUrl"
            value={formik.values.imageUrl}
            onChange={(event) => {
              setImageBroken(false);
              formik.handleChange(event);
            }}
            onBlur={formik.handleBlur}
            className={formStyles.fieldInput}
          />
          {formik.touched.imageUrl && formik.errors.imageUrl && (
            <div className={formStyles.fieldError}>
              {formik.errors.imageUrl}
            </div>
          )}
        </label>

        <div
          className={styles.imagePreview}
          style={{ backgroundImage: previewBackground }}
        >
          {imageUrl && !imageBroken && (
            <img
              src={imageUrl}
              alt=""
              style={{ display: "none" }}
              onError={() => setImageBroken(true)}
            />
          )}
        </div>

        <button
          type="button"
          className={formStyles.localizationDisclosure}
          onClick={() => setLocalizationOpen((current) => !current)}
        >
          {localizationOpen ? (
            <ChevronUp size={14} aria-hidden="true" />
          ) : (
            <ChevronDown size={14} aria-hidden="true" />
          )}
          {t("categories.form.addUkrainian")}
        </button>

        {localizationOpen && (
          <>
            <label className={formStyles.field}>
              <span className={formStyles.fieldLabel}>
                {t("categories.form.ukrainianName")}
              </span>
              <input
                name="nameLocalizedUk"
                value={formik.values.nameLocalizedUk}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={formStyles.fieldInput}
                maxLength={100}
              />
            </label>

            <label className={formStyles.field}>
              <span className={formStyles.fieldLabel}>
                {t("categories.form.ukrainianDescription")}
              </span>
              <textarea
                name="descriptionLocalizedUk"
                value={formik.values.descriptionLocalizedUk}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={formStyles.fieldTextarea}
                maxLength={1000}
              />
              <div className={formStyles.fieldMeta}>
                <span className={formStyles.charCount}>
                  {formik.values.descriptionLocalizedUk.length} / 1000
                </span>
              </div>
            </label>
          </>
        )}

        <div className={formStyles.modalFooter}>
          <button
            type="button"
            className={formStyles.cancelButton}
            onClick={onClose}
          >
            {t("common.actions.cancel")}
          </button>
          <button
            type="submit"
            className={formStyles.submitButton}
            disabled={isSubmitting}
          >
            {mode === "create" ? (
              <Plus size={16} aria-hidden="true" />
            ) : (
              <Check size={16} aria-hidden="true" />
            )}
            {mode === "create"
              ? t("categories.form.createTitle")
              : t("categories.form.saveChanges")}
          </button>
        </div>
      </form>
    </BaseModal>
  );
};
