import { useRef, useState } from "react";
import styles from "./UploadImage.module.scss";
import { Upload } from "@shared/assets/icons/actions";
import { ModalCropper } from "./modal-window/ModalCropper";

interface UploadImageProps {
  src?: string | File | null;
  onChange: (file: File | null) => void;
  error?: string | null;
}

export const UploadImage = ({ src, onChange, error }: UploadImageProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isModalCropOpen, setIsModalCropOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    setSelectedFile(file);
    setPreview(previewUrl);
    setIsModalCropOpen(true);
    e.target.value = "";
  };

  const handleSave = () => {
    onChange(selectedFile);
    setIsModalCropOpen(false);
  };

  const handleClose = () => {
    setIsModalCropOpen(false);
    setSelectedFile(null);
    setPreview(null);
  };

  const displaySrc = (() => {
    if (src instanceof File) {
      return URL.createObjectURL(src);
    }
    return src;
  })();

  return (
    <>
      <div className={styles.uploadWrapper}>
        <div
          className={`${styles.uploadContainer} ${
            error ? styles.errorBorder : ""
          }`}
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
              <span>Click to upload</span> or drag and drop SVG, PNG, JPG, or
              GIF (max. 800×400px)
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
          maxWidth="820px"
          onSave={(file: File) => {
            onChange(file);
            setIsModalCropOpen(false);
          }}
        />
      )}
    </>
  );
};
