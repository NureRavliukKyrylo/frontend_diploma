import styles from "./SettingsMainForm.module.scss";
import {
  DatePickerInput,
  MapLocationInput,
  BaseInput,
  TextArea,
} from "@shared/ui/inputs";
import { UploadImage } from "@features/profile/upload-image";
import { useState } from "react";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { useSettingsMainForm } from "../../model/useSettingsMainForm";
import { MapLocationModal } from "../location-modal-picker/MapLocationModal";
import { motion } from "framer-motion";
import { useMediaQuery } from "usehooks-ts";
import { useTranslation } from "react-i18next";

export function SettingsMainForm() {
  const { t } = useTranslation("profile");
  const {
    formik,
    isLoading,
    errorMessage,
    handleFileChange,
    handleLocationChange,
  } = useSettingsMainForm();
  const [isMapOpen, setIsMapOpen] = useState<boolean>(false);
  const [resetKey, setResetKey] = useState(0);
  const isLaptop = useMediaQuery("(max-width: 1200px)");
  const isMobile = useMediaQuery("(max-width: 600px)");
  const isTablet = useMediaQuery("(max-width: 900px)");
  const minHeight = isMobile ? 140 : isTablet ? 180 : 220;

  return (
    <form onSubmit={formik.handleSubmit} className={styles.mainInfoProfileForm}>
      <div className={styles.publicProfile}>
        <div className={styles.publicProfileText}>
          <h1>{t("settings.publicProfile.title")}</h1>
          <p>{t("settings.publicProfile.description")}</p>
        </div>
        <div className={styles.formInfoPublicProfile}>
          <div className={styles.nameInputsWrapper}>
            <BaseInput
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={formik.submitCount > 0 ? formik.errors.firstName : ""}
              placeholder={t("settings.publicProfile.firstName")}
              variant="profile"
            />
            <BaseInput
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.submitCount > 0 ? formik.errors.lastName : ""}
              placeholder={t("settings.publicProfile.lastName")}
              variant="profile"
            />
          </div>
          <div className={styles.datePickerWrapper}>
            <DatePickerInput
              key={resetKey}
              name="dateOfBirth"
              value={formik.values.dateOfBirth}
              onChange={(value) => formik.setFieldValue("dateOfBirth", value)}
              error={formik.errors.dateOfBirth}
              submit={formik.submitCount > 0}
              showMonthAndYearPickers
              classNames={{
                base: "border-1 border-black",
                inputWrapper: "border-3 border-black shadow-none bg-[#f9f9f9]",
              }}
            />
          </div>
          <div className={styles.mapLocationWrapper}>
            <MapLocationInput
              label={formik.values.location}
              handleMapOpen={() => setIsMapOpen(true)}
              variant="editProfile"
            />
            <MapLocationModal
              isMapOpen={isMapOpen}
              onClose={() => setIsMapOpen(false)}
              coordinates={formik.values.coordinates}
              setCoordinates={handleLocationChange}
              popUpText="nice"
              maxWidth="1200px"
            />
          </div>
        </div>
      </div>

      <div className={styles.lineDividerProfileSettings} />

      <div className={styles.publicProfile}>
        <div className={styles.publicProfileText}>
          <h1>{t("settings.bio.title")}</h1>
          <p>{t("settings.bio.description")}</p>
        </div>
        <div className={styles.formInfoPublicProfile}>
          <div className={styles.textAreaProfileSettingsBlock}>
            <TextArea
              name="about"
              value={formik.values.about}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.submitCount > 0 ? formik.errors.about : ""}
              minHeight={minHeight}
              variant="profile"
              placeHolder={t("settings.bio.input")}
            />
          </div>
        </div>
      </div>

      <div className={styles.lineDividerProfileSettings} />

      <div className={styles.publicProfile}>
        <div className={styles.publicProfileText}>
          <h1>{t("settings.photo.title")}</h1>
          <p>{t("settings.photo.description")}</p>
        </div>
        <div className={styles.formInfoPublicProfile}>
          <UploadImage
            maxWidth={isLaptop ? "600px" : undefined}
            src={formik.values.avatar}
            onChange={handleFileChange}
            error={formik.touched.avatar ? formik.errors.avatar : null}
          />
        </div>
      </div>

      <div className={styles.lineDividerProfileSettings} />

      <div className={styles.blockButtons}>
        <motion.div
          animate={{ x: 0 }}
          whileHover={{ x: [0, -4, 4, -4, 4, 0] }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.4 }}
          className={styles.resetProfileButton}
        >
          <BaseButtonWrapper
            type="button"
            onClick={() => {
              formik.handleReset(null);
              setResetKey((k) => k + 1);
            }}
            className={styles.resetButton}
          >
            {t("settings.actions.reset")}
          </BaseButtonWrapper>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
          className={styles.saveProfileButton}
        >
          <BaseButtonWrapper
            loading={isLoading}
            type="submit"
            className={styles.saveButton}
          >
            {t("settings.actions.save")}
          </BaseButtonWrapper>
        </motion.div>
      </div>
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
    </form>
  );
}
