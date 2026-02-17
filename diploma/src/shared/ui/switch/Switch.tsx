import { Switch as SwitchHero } from "@heroui/react";

export interface SwitchProps {
  isSelected?: boolean;
  onValueChange?: (checked: boolean) => void;
  classNames?: {
    base?: string;
    wrapper?: string;
    thumb?: string;
  };
}
export const Switch = ({
  isSelected,
  onValueChange,
  classNames: externalClassNames,
}: SwitchProps) => {
  return (
    <SwitchHero
      isSelected={isSelected}
      onValueChange={onValueChange}
      aria-label="Visibility toggle"
      classNames={{
        base: `scale-80 sm:scale-90 lg:scale-110 ${externalClassNames?.base ?? ""} `,
        wrapper: `bg-[rgba(44,44,44,0.6)] ${externalClassNames?.base ?? ""} `,
      }}
    />
  );
};
