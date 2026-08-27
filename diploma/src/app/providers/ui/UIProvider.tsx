import { type ReactNode } from "react";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { LOCALE_MAP } from "@shared/config/constants";
import { useTranslation } from "react-i18next";

type Props = {
  children: ReactNode;
};

export const UIProvider = ({ children }: Props) => {
  const { i18n } = useTranslation();
  return (
    <HeroUIProvider locale={LOCALE_MAP[i18n.language as "en" | "uk"]}>
      <ToastProvider
        placement="top-right"
        maxVisibleToasts={3}
        toastOffset={10}
        toastProps={{
          variant: "flat",
          radius: "md",
          hideIcon: false,
        }}
        regionProps={{
          classNames: {
            base: "z-[12001]",
          },
        }}
      />
      {children}
    </HeroUIProvider>
  );
};
