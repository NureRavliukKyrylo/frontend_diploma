import { Switch as SwitchHero } from "@heroui/react";
import type { ComponentProps } from "react";

export type SwitchProps = ComponentProps<typeof SwitchHero>;

export const Switch = ({
  classNames: externalClassNames,
  ...rest
}: SwitchProps) => {
  return (
    <SwitchHero
      aria-label="Visibility toggle"
      classNames={{
        base: `scale-80 sm:scale-90 lg:scale-110 ${externalClassNames?.base ?? ""} `,
        wrapper: `bg-[rgba(44,44,44,0.6)] ${externalClassNames?.wrapper ?? ""} `,
      }}
      {...rest}
    />
  );
};
