import { useImageForm } from "../model/useImageForm";
import { useAuthStore } from "../../../../entities/user";
import styles from "./ImageForm.module.scss";
import { useRef } from "react";

export const ImageForm = () => {
  const { formik, handleFileChange } = useImageForm();
  const avatarFile = useAuthStore((s) => s.avatarFile);
  const inputRef = useRef<HTMLInputElement>(null);
  const avatarSrc = avatarFile ? URL.createObjectURL(avatarFile) : null;

  return (
    <form
      id="image-filling-form"
      onSubmit={formik.handleSubmit}
      className={styles.imageWrapper}
    >
      <div className={styles.imageWrapperBlock}>
        <div
          className={`${styles.imageContainer} ${
            formik.touched.avatar && formik.errors.avatar
              ? styles.errorBorder
              : ""
          }`}
          onClick={() => inputRef.current?.click()}
        >
          <input
            type="file"
            ref={inputRef}
            className={styles.downloadInput}
            onChange={handleFileChange}
            accept="image/*"
          />

          {avatarSrc ? (
            <img
              src={avatarSrc}
              alt="Preview"
              className={styles.imagePreview}
            />
          ) : (
            <div className={styles.imagePlus}></div>
          )}
        </div>
      </div>
      {formik.touched.avatar && formik.errors.avatar && (
        <div className={styles.errorImage}>{formik.errors.avatar}</div>
      )}
    </form>
  );
};
