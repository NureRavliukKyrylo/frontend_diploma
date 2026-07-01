import { AdminPlaceholderPage } from "../../shared/ui/AdminPlaceholderPage";
import { useTranslation } from "react-i18next";

export const AdminTimeBankPage = () => {
  const { t } = useTranslation("admin");

  return (
    <AdminPlaceholderPage
      eyebrow={t("common.eyebrow")}
      title={t("timeBank.title")}
      description={t("timeBank.description")}
    />
  );
};
