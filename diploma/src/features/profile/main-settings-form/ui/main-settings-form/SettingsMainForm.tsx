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

export function SettingsMainForm() {
  const {
    formik,
    isLoading,
    errorMessage,
    handleFileChange,
    handleLocationChange,
  } = useSettingsMainForm();

  const [isMapOpen, setIsMapOpen] = useState<boolean>(false);
  const [resetKey, setResetKey] = useState(0);

  const handleCloseModal = () => {
    setIsMapOpen(false);
  };

  const handleOpenModal = () => {
    setIsMapOpen(true);
  };
  const isLaptop = useMediaQuery("(max-width: 1200px)");
  const isMobile = useMediaQuery("(max-width: 600px)");
  const isTablet = useMediaQuery("(max-width: 900px)");

  const minHeight = isMobile ? 140 : isTablet ? 180 : 220;

  return (
    <form onSubmit={formik.handleSubmit} className={styles.mainInfoProfileForm}>
      <div className={styles.publicProfile}>
        <div className={styles.publicProfileText}>
          <h1>Public profile</h1>
          <p>This information will be visible on your public profile</p>
        </div>
        <div className={styles.formInfoPublicProfile}>
          <div className={styles.nameInputsWrapper}>
            <BaseInput
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={formik.submitCount > 0 ? formik.errors.firstName : ""}
              placeholder="First Name"
              variant="profile"
            />
            <BaseInput
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.submitCount > 0 ? formik.errors.lastName : ""}
              placeholder="Last Name"
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
              handleMapOpen={handleOpenModal}
              variant="editProfile"
            />
            <MapLocationModal
              isMapOpen={isMapOpen}
              onClose={handleCloseModal}
              coordinates={formik.values.coordinates}
              setCoordinates={handleLocationChange}
              popUpText="nice"
              maxWidth="1200px"
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
          <div className={styles.textAreaProfileSettingsBlock}>
            <TextArea
              name="about"
              value={formik.values.about}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.submitCount > 0 ? formik.errors.about : ""}
              minHeight={minHeight}
              variant="profile"
            />
          </div>
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
            maxWidth={isLaptop ? "600px" : undefined}
            src={formik.values.avatar}
            onChange={handleFileChange}
            error={formik.touched.avatar ? formik.errors.avatar : null}
          />
        </div>
      </div>

      <div className={styles.lineDividerProfileSettings}></div>

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
            RESET
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
            SAVE
          </BaseButtonWrapper>
        </motion.div>
      </div>
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
    </form>
  );
}
