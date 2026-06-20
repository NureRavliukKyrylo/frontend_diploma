import { SocialNetworksInput } from "@shared/ui/inputs";
import { useContactsForm } from "../../contacts-form/model/useContactsForm";
import styles from "./ContactsForm.module.scss";
import { getSocialPlatforms } from "@shared/config/constants";
import { useTranslation } from "react-i18next";

export const ContactsForm = () => {
  const { formik } = useContactsForm();
  const { t } = useTranslation("common");
  const socialPlatforms = getSocialPlatforms(t);
  console.log(formik.values["Instagram"]);
  return (
    <form
      id="contacts-filling-form"
      className={styles.contactsWrapper}
      onSubmit={formik.handleSubmit}
    >
      <div className={styles.inputsContactsForm}>
        {socialPlatforms.map(({ key, label, activeLabel, icon }) => {
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
