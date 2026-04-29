import { type ReactNode } from "react";
import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";

type Props = {
  children: ReactNode;
};

export const UIProvider = ({ children }: Props) => {
  return (
    <HeroUIProvider>
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
            base: "z-[10001]",
          },
        }}
      />
      {children}
    </HeroUIProvider>
  );
};
