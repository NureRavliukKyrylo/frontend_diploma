import styles from "./UploadImage.module.scss";
import { Upload } from "@shared/assets/icons/actions";
import { ModalCropper } from "../modal-window/ModalCropper";
import { useUploadImage } from "../../model/useUploadImage";
import { useTranslation } from "react-i18next";

interface UploadImageProps {
  src?: string | File | null;
  onChange: (file: File | null) => void;
  error?: string | null;
  inputName?: string;
  maxWidth?: string;
  accept?: string;
  helperText?: string;
  maxSize?: number;
  formats?: string[];
  sizeMessage?: string;
  formatMessage?: string;
}

export const UploadImage = ({
  src,
  onChange,
  maxWidth = "820px",
}: UploadImageProps) => {
  const { t } = useTranslation("profile");
  const {
    inputRef,
    isModalCropOpen,
    preview,
    displaySrc,
    handleClick,
    handleChange,
    handleSave,
    handleClose,
    error,
  } = useUploadImage({ src, onChange });

  return (
    <>
      <div className={styles.uploadWrapper}>
        <div
          className={`${styles.uploadContainer} ${error ? styles.errorBorder : ""}`}
          onClick={handleClick}
        >
          <input
            type="file"
            ref={inputRef}
            className={styles.inputHidden}
            accept="image/*"
            onChange={handleChange}
          />
          <div className={styles.placeholder}>
            {displaySrc ? (
              <img
                src={displaySrc}
                alt="Preview"
                className={styles.previewImage}
              />
            ) : (
              <div className={styles.wrapperImage}>
                <img src={Upload} alt="upload icon" className={styles.icon} />
              </div>
            )}
            <p>
              <span>{t("upload.clickToUpload")}</span> {t("upload.dragAndDrop")}
            </p>
          </div>
        </div>
        {error && <div className="errorMessage">{error}</div>}
      </div>
      {preview && (
        <ModalCropper
          src={preview}
          isOpen={isModalCropOpen}
          onClose={handleClose}
          maxWidth={maxWidth}
          onSave={handleSave}
        />
      )}
    </>
  );
};
