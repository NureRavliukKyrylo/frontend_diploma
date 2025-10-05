import { useRef, useState } from "react";
import styles from "./ImageForm.module.scss";

export const ImageForm = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className={styles.imageWrapper}>
      <div
        className={styles.imageContainer}
        onClick={() => inputRef.current?.click()}
      >
        <input
          type="file"
          ref={inputRef}
          className={styles.downloadInput}
          onChange={handleFileChange}
          accept="image/*"
        />
        {preview ? (
          <img src={preview} alt="Preview" className={styles.imagePreview} />
        ) : (
          <div className={styles.imagePlus}></div>
        )}
      </div>
    </div>
  );
};
