import { useFormik } from "formik";
import { useAuthStore } from "../../../../entities/user";
import { contactsSchema } from "../libs/contactsSchema";
import { useSubmitFillingForm } from "./useSubmitFillingForm";
import { useRouter } from "@tanstack/react-router";

export const useContactsForm = () => {
  const setTelegram = useAuthStore((state) => state.setTelegram);
  const setPrivacyField = useAuthStore((state) => state.setPrivacyField);
  const privacySettings = useAuthStore((state) => state.privacySettings);
  const profile = useAuthStore((state) => state.profile);
  const { handleSubmit } = useSubmitFillingForm();
  const router = useRouter();

  const instagramField = privacySettings.fields.find(
    (f) => f.fieldName === "instagram"
  );

  const formik = useFormik({
    initialValues: {
      instagram: profile.telegram || "",
      showInstagram: instagramField ? instagramField.visibility === 1 : false,
    },
    validationSchema: contactsSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log("[DEBUG] Submitting form:", values);

      setTelegram(values.instagram);

      setPrivacyField("instagram", {
        fieldName: "instagram",
        visibility: values.showInstagram ? 1 : 0,
      });
      console.log(profile.telegram);
      console.log("sadasda", instagramField?.visibility);
      handleSubmit();
    },
  });

  return formik;
};
