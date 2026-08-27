import { AdminPlaceholderPage } from "../../shared/ui/AdminPlaceholderPage";
import { useTranslation } from "react-i18next";

export const AdminAccessPoliciesPage = () => {
  const { t } = useTranslation("admin");

  return (
    <AdminPlaceholderPage
      eyebrow={t("common.eyebrow")}
      title={t("accessPolicies.title")}
      description={t("accessPolicies.description")}
    />
  );
};
