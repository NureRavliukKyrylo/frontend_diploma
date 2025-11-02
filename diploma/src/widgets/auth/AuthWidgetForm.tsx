import { AuthWrapper } from "@shared/ui/wrappers";
import { useAuthStore } from "@entities/user";
import { authTabs } from "./configs/authTabs";
import { authForms } from "./configs/authForms";

export function AuthWidgetForm() {
  const { mode, setMode } = useAuthStore();

  return (
    <AuthWrapper
      tabs={authTabs}
      activeValue={mode}
      onChange={setMode}
      forms={authForms}
    />
  );
}
