import { type ReactNode } from "react";
import { LOCALE_MAP } from "@shared/config/constants";
import { useTranslation } from "react-i18next";
import { I18nProvider } from "@react-aria/i18n";

type Props = {
  children: ReactNode;
};

export const DateLocalProvider = ({ children }: Props) => {
  const { i18n } = useTranslation();
  return (
    <I18nProvider locale={LOCALE_MAP[i18n.language as "en" | "ua"]}>
      {children}
    </I18nProvider>
  );
};
