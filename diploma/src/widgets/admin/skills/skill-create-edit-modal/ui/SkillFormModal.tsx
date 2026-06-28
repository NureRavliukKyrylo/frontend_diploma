import type { SkillListItemDto } from "@entities/skill";
import { BaseModal } from "@shared/ui/modals";
import { CategorySearchPicker } from "@shared/ui/pickers";
import { Check, ChevronDown, ChevronUp, ImagePlus, Plus, X } from "lucide-react";
import { useRef, useState } from "react";
import { useSkillForm } from "../model/useSkillForm";
import styles from "./SkillFormModal.module.scss";

interface SkillFormModalProps {
  isOpen: boolean;
  mode: "create" | "edit";
  skill?: SkillListItemDto | null;
  onClose: () => void;
}

export const SkillFormModal = ({
  isOpen,
  mode,
  skill,
  onClose,
}: SkillFormModalProps) => {
  const iconInputRef = useRef<HTMLInputElement>(null);
  const [localizationOpen, setLocalizationOpen] = useState(false);
  const { formik, iconError, iconPreview, isSubmitting, selectIcon } =
    useSkillForm({
      mode,
      skill,
      onSuccess: onClose,
    });
  const title = mode === "create" ? "Create skill" : "Edit skill";
  const subtitle =
    mode === "create"
      ? "Add a reusable skill volunteers can attach to their profile."
      : "Update the public information shown for this skill.";

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="580px"
      showClosed={false}
    >
      <form className={styles.modalWrapper} onSubmit={formik.handleSubmit}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close skill form"
        >
          <X size={18} aria-hidden="true" />
        </button>

        <h2 className={styles.modalTitle}>{title}</h2>
        <p className={styles.modalSubtitle}>{subtitle}</p>

        <div className={styles.iconUploadRow}>
          <span className={styles.iconDropzone}>
            {iconPreview ? (
              <img
                src={iconPreview}
                alt=""
                className={styles.iconDropzonePreview}
              />
            ) : (
              <ImagePlus size={24} aria-hidden="true" />
            )}
          </span>
          <div>
            <button
              type="button"
              className={styles.uploadButtonSmall}
              onClick={() => iconInputRef.current?.click()}
            >
              <ImagePlus size={15} aria-hidden="true" />
              Upload icon
            </button>
            <div className={styles.hintText}>PNG, JPG, SVG. 2MB max.</div>
            {iconError && <div className={styles.fieldError}>{iconError}</div>}
            <input
              ref={iconInputRef}
              type="file"
              accept="image/*"
              className={styles.hiddenInput}
              onChange={(event) => {
                selectIcon(event.currentTarget.files?.[0] ?? null);
                event.currentTarget.value = "";
              }}
            />
          </div>
        </div>

        <label className={styles.field}>
          <span className={styles.fieldLabel}>
            Name <span className={styles.fieldRequired}>*</span>
          </span>
          <input
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={styles.fieldInput}
            maxLength={120}
          />
          {formik.touched.name && formik.errors.name && (
            <div className={styles.fieldError}>{formik.errors.name}</div>
          )}
        </label>

        <label className={styles.field}>
          <span className={styles.fieldLabel}>Description</span>
          <textarea
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={styles.fieldTextarea}
            maxLength={1000}
          />
          <div className={styles.fieldMeta}>
            {formik.touched.description && formik.errors.description && (
              <span className={styles.fieldError}>
                {formik.errors.description}
              </span>
            )}
            <span className={styles.charCount}>
              {formik.values.description.length} / 1000
            </span>
          </div>
        </label>

        <label className={styles.field}>
          <span className={styles.fieldLabel}>Categories</span>
          <CategorySearchPicker
            value={formik.values.categoryIds}
            onChange={(categoryIds) =>
              formik.setFieldValue("categoryIds", categoryIds)
            }
          />
        </label>

        <button
          type="button"
          className={styles.localizationDisclosure}
          onClick={() => setLocalizationOpen((current) => !current)}
        >
          {localizationOpen ? (
            <ChevronUp size={14} aria-hidden="true" />
          ) : (
            <ChevronDown size={14} aria-hidden="true" />
          )}
          Add Ukrainian translation (optional)
        </button>

        {localizationOpen && (
          <>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>Ukrainian name</span>
              <input
                name="nameLocalizedUk"
                value={formik.values.nameLocalizedUk}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={styles.fieldInput}
                maxLength={120}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.fieldLabel}>Ukrainian description</span>
              <textarea
                name="descriptionLocalizedUk"
                value={formik.values.descriptionLocalizedUk}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={styles.fieldTextarea}
                maxLength={1000}
              />
              <div className={styles.fieldMeta}>
                <span className={styles.charCount}>
                  {formik.values.descriptionLocalizedUk.length} / 1000
                </span>
              </div>
            </label>
          </>
        )}

        <div className={styles.modalFooter}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {mode === "create" ? (
              <Plus size={16} aria-hidden="true" />
            ) : (
              <Check size={16} aria-hidden="true" />
            )}
            {mode === "create" ? "Create skill" : "Save changes"}
          </button>
        </div>
      </form>
    </BaseModal>
  );
};
