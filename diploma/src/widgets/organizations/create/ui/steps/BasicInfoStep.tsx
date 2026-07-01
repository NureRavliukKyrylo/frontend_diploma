import { BaseButtonWrapper } from "@shared/ui/buttons";
import { useTranslation } from "react-i18next";
import { useOrganizationCreateBasicInfoForm } from "@features/organization/create-form";
import {
  IconBuildingCommunity,
  IconMail,
  IconWorld,
} from "@tabler/icons-react";
import commonStyles from "../Common.module.scss";

const getFieldError = (error?: string, touched?: boolean, submitCount = 0) => {
  if (!error) {
    return "";
  }

  return touched || submitCount > 0 ? error : "";
};

export const OrganizationCreateBasicInfoStep = () => {
  const { t } = useTranslation("organizations");
  const { formik } = useOrganizationCreateBasicInfoForm();
  const nameError = getFieldError(
    formik.errors.name,
    formik.touched.name,
    formik.submitCount,
  );
  const websiteError = getFieldError(
    formik.errors.website,
    formik.touched.website,
    formik.submitCount,
  );
  const emailError = getFieldError(
    formik.errors.contactEmail,
    formik.touched.contactEmail,
    formik.submitCount,
  );
  const descriptionError = getFieldError(
    formik.errors.description,
    formik.touched.description,
    formik.submitCount,
  );

  return (
    <form
      id="organization-create-basic-info-form"
      onSubmit={formik.handleSubmit}
      className={commonStyles.formShell}
    >
      <div className={commonStyles.card}>
        <div className={commonStyles.cardDeco} />
        <h2 className={commonStyles.cardHeading}>
          {t("create.basics.title")}
        </h2>
        <p className={commonStyles.cardDesc}>
          {t("create.basics.text")}
        </p>

        <div className={commonStyles.fields}>
          <div className={commonStyles.field}>
            <label
              className={commonStyles.fieldLabel}
              htmlFor="organization-name"
            >
              {t("create.fields.name")}
            </label>
            <div className={commonStyles.iconField}>
              <IconBuildingCommunity
                className={commonStyles.fieldIcon}
                size={18}
                aria-hidden="true"
              />
              <input
                id="organization-name"
                name="name"
                type="text"
                autoComplete="organization"
                aria-label={t("create.fields.name")}
                className={`${commonStyles.input} ${
                  nameError ? commonStyles.inputError : ""
                }`}
                placeholder={t("create.basics.nameExample")}
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {nameError ? (
              <span className={commonStyles.errorText}>{nameError}</span>
            ) : null}
          </div>

          <div className={commonStyles.fieldRow}>
            <div className={commonStyles.field}>
              <label
                className={commonStyles.fieldLabel}
                htmlFor="organization-website"
              >
                {t("create.fields.website")}
              </label>
              <div className={commonStyles.iconField}>
                <IconWorld
                  className={commonStyles.fieldIcon}
                  size={18}
                  aria-hidden="true"
                />
                <input
                  id="organization-website"
                  name="website"
                  type="text"
                  inputMode="url"
                  autoComplete="url"
                  aria-label={t("create.fields.website")}
                  spellCheck={false}
                  className={`${commonStyles.input} ${
                    websiteError ? commonStyles.inputError : ""
                  }`}
                  placeholder={t("create.basics.websiteExample")}
                  value={formik.values.website}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {websiteError ? (
                <span className={commonStyles.errorText}>{websiteError}</span>
              ) : null}
            </div>

            <div className={commonStyles.field}>
              <label
                className={commonStyles.fieldLabel}
                htmlFor="organization-email"
              >
                {t("create.fields.email")}
              </label>
              <div className={commonStyles.iconField}>
                <IconMail
                  className={commonStyles.fieldIcon}
                  size={18}
                  aria-hidden="true"
                />
                <input
                  id="organization-email"
                  name="contactEmail"
                  type="email"
                  autoComplete="email"
                  aria-label={t("create.fields.email")}
                  spellCheck={false}
                  className={`${commonStyles.input} ${
                    emailError ? commonStyles.inputError : ""
                  }`}
                  placeholder={t("create.basics.emailExample")}
                  value={formik.values.contactEmail}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {emailError ? (
                <span className={commonStyles.errorText}>{emailError}</span>
              ) : null}
            </div>
          </div>

          <div className={commonStyles.field}>
            <label
              className={commonStyles.fieldLabel}
              htmlFor="organization-description"
            >
              {t("create.fields.description")}
            </label>
            <textarea
              id="organization-description"
              name="description"
              aria-label={t("create.fields.description")}
              className={`${commonStyles.textarea} ${
                descriptionError ? commonStyles.textareaError : ""
              }`}
              placeholder={t("create.basics.descriptionExample")}
              maxLength={1000}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {descriptionError ? (
              <span className={commonStyles.errorText}>{descriptionError}</span>
            ) : null}
          </div>
        </div>
      </div>

      <div className={commonStyles.continueWrap}>
        <BaseButtonWrapper
          type="submit"
          className={commonStyles.continueButton}
        >
          {t("create.actions.continue")}
        </BaseButtonWrapper>
      </div>
    </form>
  );
};
