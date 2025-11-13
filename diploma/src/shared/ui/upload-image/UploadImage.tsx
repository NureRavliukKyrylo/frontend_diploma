import { useRef } from "react";
import styles from "./UploadImage.module.scss";
import { Upload } from "@shared/assets/icons/actions";

interface UploadImageProps {
  src?: string | null;
  onChange: (file: File | null) => void;
  error?: string | null;
}

export const UploadImage = ({ src, onChange, error }: UploadImageProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);
  };

  return (
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

        {src ? (
          <img src={src} alt="Preview" className={styles.previewImage} />
        ) : (
          <div className={styles.placeholder}>
            <div className={styles.wrapperImage}>
              <img src={Upload} alt="upload icon" className={styles.icon} />
            </div>
            <p>
              <span>Click to upload</span> or drag and drop SVG, PNG, JPG, or
              GIF (max. 800×400px)
            </p>
          </div>
        )}
      </div>

      {error && <div className="errorMessage">{error}</div>}
    </div>
  );
};
