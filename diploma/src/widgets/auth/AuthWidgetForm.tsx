import { AuthWrapper } from "@features/auth";
import { useAuthStore } from "@entities/user";
import { getAuthTabs } from "./configs/authTabs";
import { authForms } from "./configs/authForms";
import { useTranslation } from "react-i18next";

export function AuthWidgetForm() {
  const { mode, setMode } = useAuthStore();
  const { t } = useTranslation("auth");
  const authTabs = getAuthTabs(t);
  return (
    <AuthWrapper
      tabs={authTabs}
      activeValue={mode}
      onChange={setMode}
      forms={authForms}
      t={t}
    />
  );
}
