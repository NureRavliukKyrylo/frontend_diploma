import { InstagramIcon } from "@shared/assets/icons/brands";
import { SettingsWrapper } from "@shared/ui/wrappers";
import styles from "./SettingsMainForm.module.scss";
import { DatePickerInput, ProfileBaseInput, TextArea } from "@shared/ui/inputs";
import { useAboutForm } from "@features/multi-step-filling-info/about-form/model/useAboutForm";
import { UploadImage } from "@shared/ui";
import { useMemo, useState } from "react";
import { AuthButton } from "@shared/ui/buttons";

export function SettingsMainForm({}) {
  const formik = useAboutForm();
  const [avatar, setAvatar] = useState<File | null>(null);
  const [about, setAbout] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);

  const imageSrc = useMemo(() => {
    if (avatar instanceof File) {
      return URL.createObjectURL(avatar);
    }
    return null;
  }, [avatar]);

  const handleFileChange = (file: File | null) => {
    setAvatar(file);
    setError(file ? null : "Please select an image");
  };
  return (
    <SettingsWrapper
      profileAvatar={InstagramIcon}
      fullName="Mykola Shestakov"
      email="example@gmail.com"
      settingsTitle="User profile"
      settingsDescription="Update your personal photo, links, and account details here."
    >
      <div className={styles.mainInfoProfileForm}>
        <div className={styles.publicProfile}>
          <div className={styles.publicProfileText}>
            <h1>Public profile</h1>
            <p>This information will be visible on your public profile</p>
          </div>
          <div className={styles.formInfoPublicProfile}>
            <ProfileBaseInput />
            <div className={styles.datePickerWrapper}>
              <DatePickerInput
                name="dateOfBirth"
                label=""
                value={formik.values.dateOfBirth}
                error={formik.errors.dateOfBirth}
                submit={formik.submitCount > 0}
                onChange={(value) => formik.setFieldValue("dateOfBirth", value)}
                showMonthAndYearPickers
              />
            </div>
          </div>
        </div>
        <div className={styles.lineDividerProfileSettings}></div>
        <div className={styles.publicProfile}>
          <div className={styles.publicProfileText}>
            <h1>Bio description</h1>
            <p>This will be your main story. Keep it very, very long </p>
          </div>
          <div className={styles.formInfoPublicProfile}>
            <TextArea
              id="about"
              name="about"
              value={formik.values.about}
              onChange={(e) => {
                formik.handleChange(e);
              }}
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
          <AuthButton label="SAVE" />
        </div>
      </div>
    </SettingsWrapper>
  );
}
