import { SocialNetworksInput } from "@shared/ui/inputs";
import { useContactsForm } from "../../contacts-form/model/useContactsForm";
import styles from "./ContactsForm.module.scss";
import { SOCIAL_PLATFORMS } from "@shared/config/constants";

export const ContactsForm = () => {
  const { formik } = useContactsForm();
  return (
    <form
      id="contacts-filling-form"
      className={styles.contactsWrapper}
      onSubmit={formik.handleSubmit}
    >
      <div className={styles.inputsContactsForm}>
        {SOCIAL_PLATFORMS.map(({ key, label, activeLabel, icon }) => {
          const fieldError = formik.errors[key] as { url?: string } | undefined;
          return (
            <SocialNetworksInput
              key={key}
              name={`${key}.url`}
              label={label}
              activeLabel={activeLabel}
              icon={icon}
              value={formik.values[key].url}
              onChange={(e) =>
                formik.setFieldValue(`${key}.url`, e.target.value)
              }
              switchValue={formik.values[key]?.visible ?? false}
              onSwitchChange={(val) =>
                formik.setFieldValue(`${key}.visible`, val)
              }
              error={formik.submitCount > 0 ? (fieldError?.url ?? "") : ""}
            />
          );
        })}
      </div>
    </form>
  );
};
