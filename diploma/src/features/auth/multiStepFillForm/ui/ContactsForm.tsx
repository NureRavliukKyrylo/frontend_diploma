import { SocialNetworksInput } from "../../../../shared/inputs";
import { InstagramIcon } from "../../../../shared/assets/common";
import { useContactsForm } from "../model/useContactsForm";
import {
  NextStepperButton,
  PreviousStepperButton,
  SkipStepperButton,
} from "../../../../shared/buttons/auth";
import styles from "./ImageForm.module.scss";

export const ContactsForm = () => {
  const formik = useContactsForm();

  return (
    <form onSubmit={formik.handleSubmit}>
      <SocialNetworksInput
        name="instagram"
        label="Enter your Instagram link"
        activeLabel="Instagram link"
        icon={InstagramIcon}
        value={formik.values.instagram}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        switchName="showInstagram"
        switchValue={formik.values.showInstagram}
        onSwitchChange={(val) => formik.setFieldValue("showInstagram", val)}
        error={
          formik.touched.instagram && formik.errors.instagram
            ? formik.errors.instagram
            : ""
        }
      />

      <div className={styles.buttonsFillForm}>
        <div className={styles.interactStepperButtons}>
          <PreviousStepperButton />
          <NextStepperButton />
          <SkipStepperButton />
        </div>
      </div>
    </form>
  );
};
