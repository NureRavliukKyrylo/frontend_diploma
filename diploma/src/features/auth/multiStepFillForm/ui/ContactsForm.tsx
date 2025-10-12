import { SocialNetworksInput } from "../../../../shared/inputs";
import { useContactsForm } from "../model/useContactsForm";
import { useAuthStore } from "../../../../entities/user";
import styles from "./ContactsForm.module.scss";
import { PLATFORM_CONFIG } from "./configs/sociallnputConfig";

export const ContactsForm = () => {
  const formik = useContactsForm();
  const { setSocialLink, setPrivacyField } = useAuthStore();

  const buildFieldName = (key: string) =>
    `Platform.${key.charAt(0).toUpperCase() + key.slice(1)}`;

  return (
    <form
      id="contacts-filling-form"
      className={styles.contactsWrapper}
      onSubmit={formik.handleSubmit}
    >
      <div className={styles.inputsContactsForm}>
        {PLATFORM_CONFIG.map(({ platform, key, label, activeLabel, icon }) => {
          const fieldName = buildFieldName(key);
          const switchName = `show${
            key.charAt(0).toUpperCase() + key.slice(1)
          }`;

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
                setSocialLink(platform, e.target.value);
              }}
              switchName={switchName}
              switchValue={formik.values[switchName]}
              onSwitchChange={(val) => {
                formik.setFieldValue(switchName, val);
                setPrivacyField(fieldName, {
                  fieldName,
                  visibility: val ? 1 : 0,
                });
              }}
              error={
                formik.errors[key] &&
                (formik.submitCount > 0 || formik.values[key] !== "")
                  ? (formik.errors[key] as string)
                  : ""
              }
            />
          );
        })}
      </div>
    </form>
  );
};
