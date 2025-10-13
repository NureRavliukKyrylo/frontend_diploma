import { useImageForm } from "../model/useImageForm";
import styles from "./ImageForm.module.scss";
import { useMemo, useRef } from "react";

export const ImageForm = () => {
  const { formik, handleFileChange } = useImageForm();
  const inputRef = useRef<HTMLInputElement>(null);

  const avatarSrc = useMemo(() => {
    if (formik.values.avatar instanceof File) {
      return URL.createObjectURL(formik.values.avatar);
    }
    return null;
  }, [formik.values.avatar]);

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
