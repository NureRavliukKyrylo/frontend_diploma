import { SocialNetworksInput } from "@shared/ui/inputs";
import { useContactsForm } from "../../contacts-form/model/useContactsForm";
import styles from "./ContactsForm.module.scss";
import { PLATFORM_CONFIG } from "../configs/sociallnputConfig";

export const ContactsForm = () => {
  const { formik } = useContactsForm();

  return (
    <form
      id="contacts-filling-form"
      className={styles.contactsWrapper}
      onSubmit={formik.handleSubmit}
    >
      <div className={styles.inputsContactsForm}>
        {PLATFORM_CONFIG.map(({ key, label, activeLabel, icon }) => {
          const switchName = `show${key}`;
          return (
            <SocialNetworksInput
              key={key}
              name={key}
              label={label}
              activeLabel={activeLabel}
              icon={icon}
              value={formik.values[key]}
              onChange={(e) => {
                formik.handleChange(e);
              }}
              switchValue={formik.values[switchName]}
              onSwitchChange={(val) => {
                formik.setFieldValue(switchName, val);
              }}
              error={
                formik.submitCount > 0 ? (formik.errors[key] as string) : ""
              }
            />
          );
        })}
      </div>
    </form>
  );
};
