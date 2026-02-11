import styles from "./SettingsMainForm.module.scss";
import { DatePickerInput, ProfileBaseInput, TextArea } from "@shared/ui/inputs";
import { UploadImage } from "@shared/ui";
import { useMemo, useState } from "react";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { useSettingsMainForm } from "../model/useSettingsMainForm";
import { useErrorStore } from "@shared/config/stores";

export function SettingsMainForm() {
  const { formik, isLoading } = useSettingsMainForm();
  const [avatar, setAvatar] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const serverError = useErrorStore(
    (state) => state.errors["updateProfileError"],
  );
  const imageSrc = useMemo(() => {
    if (avatar instanceof File) return URL.createObjectURL(avatar);
    return null;
  }, [avatar]);

  const handleFileChange = (file: File | null) => {
    setAvatar(file);
    setError(file ? null : "Please select an image");
  };

  return (
    <form onSubmit={formik.handleSubmit} className={styles.mainInfoProfileForm}>
      <div className={styles.publicProfile}>
        <div className={styles.publicProfileText}>
          <h1>Public profile</h1>
          <p>This information will be visible on your public profile</p>
        </div>
        <div className={styles.formInfoPublicProfile}>
          <ProfileBaseInput
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.submitCount > 0 ? formik.errors.firstName : ""}
          />
          <ProfileBaseInput
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.submitCount > 0 ? formik.errors.lastName : ""}
          />
          <div className={styles.datePickerWrapper}>
            <DatePickerInput
              name="dateOfBirth"
              value={formik.values.dateOfBirth}
              onChange={(value) => formik.setFieldValue("dateOfBirth", value)}
              error={formik.submitCount > 0 ? formik.errors.dateOfBirth : ""}
              showMonthAndYearPickers
            />
          </div>
        </div>
      </div>

      <div className={styles.lineDividerProfileSettings}></div>

      <div className={styles.publicProfile}>
        <div className={styles.publicProfileText}>
          <h1>Bio description</h1>
          <p>This will be your main story. Keep it very, very long</p>
        </div>
        <div className={styles.formInfoPublicProfile}>
          <TextArea
            id="about"
            name="about"
            value={formik.values.about}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.submitCount > 0 ? formik.errors.about : ""}
            minHeight={220}
          />
        </div>
      </div>

      <div className={styles.lineDividerProfileSettings}></div>

      <div className={styles.publicProfile}>
        <div className={styles.publicProfileText}>
          <h1>Profile photo</h1>
          <p>
            Update your profile photo and then choose where you want it to
            display
          </p>
        </div>
        <div className={styles.formInfoPublicProfile}>
          <UploadImage
            src={imageSrc}
            onChange={handleFileChange}
            error={error}
          />
        </div>
      </div>

      <div className={styles.lineDividerProfileSettings}></div>

      <div className={styles.blockButtons}>
        <BaseButtonWrapper
          loading={isLoading}
          className={styles.saveProfileButton}
        >
          SAVE
        </BaseButtonWrapper>
      </div>
      {serverError && <div className="errorMessage">{serverError}</div>}
    </form>
  );
}
