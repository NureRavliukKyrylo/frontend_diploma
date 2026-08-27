import { useFormik } from "formik";
import { organizationCreateBasicInfoSchema } from "../libs/organizationCreateBasicInfoSchema";
import { useOrganizationCreateDraftStore } from "./useOrganizationCreateDraftStore";
import type { OrganizationCreateBasicInfoValues } from "./types";

const normalizeValue = (value: string) => value.trim();

export const useOrganizationCreateBasicInfoForm = () => {
  const basicInfo = useOrganizationCreateDraftStore((state) => state.basicInfo);
  const saveBasicInfo = useOrganizationCreateDraftStore(
    (state) => state.saveBasicInfo,
  );
  const setActiveStep = useOrganizationCreateDraftStore(
    (state) => state.setActiveStep,
  );

  const formik = useFormik<OrganizationCreateBasicInfoValues>({
    initialValues: basicInfo,
    enableReinitialize: true,
    validationSchema: organizationCreateBasicInfoSchema,
    onSubmit: (values) => {
      const normalizedValues = {
        name: normalizeValue(values.name),
        website: normalizeValue(values.website),
        contactEmail: normalizeValue(values.contactEmail),
        description: normalizeValue(values.description),
      };

      saveBasicInfo(normalizedValues);
      setActiveStep(2);
    },
  });

  return {
    formik,
  };
};
