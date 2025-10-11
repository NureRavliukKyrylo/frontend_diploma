import { useImageForm } from "../model/useImageForm";
import { useAuthStore } from "../../../../entities/user";
import styles from "./ImageForm.module.scss";
import { useRef } from "react";
import {
  NextStepperButton,
  PreviousStepperButton,
  SkipStepperButton,
} from "../../../../shared/buttons/auth";

export const ImageForm = () => {
  const { formik, handleFileChange } = useImageForm();
  const avatarUrl = useAuthStore((s) => s.profile.avatarUrl);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form onSubmit={formik.handleSubmit} className={styles.imageWrapper}>
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
          {avatarUrl ? (
            <img
              src={avatarUrl}
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
      <div className={styles.buttonsFillForm}>
        <PreviousStepperButton />
        <div className={styles.interactStepperButtons}>
          <SkipStepperButton />
          <NextStepperButton />
        </div>
      </div>
    </form>
  );
};
