import { ModalCropper } from "@features/profile/upload-image/ui/modal-window/ModalCropper";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { IconPhoto, IconRefresh, IconTrash } from "@tabler/icons-react";
import { useOrganizationCreateBrandingUpload } from "../model/useOrganizationCreateBrandingUpload";
import styles from "./OrganizationCreateBrandingUploadField.module.scss";

interface OrganizationCreateBrandingUploadFieldProps {
  errorTextClassName?: string;
}

export const OrganizationCreateBrandingUploadField = ({
  errorTextClassName,
}: OrganizationCreateBrandingUploadFieldProps) => {
  const {
    inputRef,
    isModalCropOpen,
    preview,
    displaySrc,
    handleClick,
    handleFile,
    handleChange,
    handleSave,
    handleClose,
    handleRemove,
    error,
  } = useOrganizationCreateBrandingUpload();

  const handleDrop = (event: React.DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];

    if (file) {
      void handleFile(file);
    }
  };

  return (
    <>
      <div className={styles.brandingUploadBlock}>
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp"
          className={styles.brandingUploadInput}
          onChange={handleChange}
        />

        {displaySrc ? (
          <div className={styles.previewWrap}>
            <img
              src={displaySrc}
              alt="Organization logo preview"
              className={styles.previewImage}
            />
            <div className={styles.previewActions}>
              <BaseButtonWrapper
                type="button"
                className={styles.previewButton}
                onClick={handleClick}
              >
                <IconRefresh size={16} aria-hidden="true" />
                Replace
              </BaseButtonWrapper>
              <BaseButtonWrapper
                type="button"
                className={styles.previewButton}
                onClick={handleRemove}
              >
                <IconTrash size={16} aria-hidden="true" />
                Remove
              </BaseButtonWrapper>
            </div>
          </div>
        ) : (
          <BaseButtonWrapper
            type="button"
            className={`${styles.uploadZone} ${
              error ? styles.uploadZoneError : ""
            }`}
            onClick={handleClick}
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleDrop}
          >
            <span className={styles.uploadIcon}>
              <IconPhoto size={28} aria-hidden="true" />
            </span>
            <span className={styles.uploadTitle}>
              Click to upload or drag and drop
            </span>
            <span className={styles.uploadHint}>
              PNG, JPG or WebP, up to 2MB
            </span>
          </BaseButtonWrapper>
        )}

        {error ? <span className={errorTextClassName}>{error}</span> : null}
      </div>

      {preview ? (
        <ModalCropper
          src={preview}
          isOpen={isModalCropOpen}
          onClose={handleClose}
          onSave={handleSave}
        />
      ) : null}
    </>
  );
};
