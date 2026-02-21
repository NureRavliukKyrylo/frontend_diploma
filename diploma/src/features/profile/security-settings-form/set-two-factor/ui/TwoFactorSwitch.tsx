import { Switch } from "@shared/ui";
import { useState } from "react";
import { useUserProfileStore } from "@entities/user";

export const TwoFactorSwitch = () => {
  const [isSelected, setIsSelected] = useState(false);
  const { openVerificationModal } = useUserProfileStore();

  return (
    <Switch
      isSelected={isSelected}
      onValueChange={(value) => {
        setIsSelected(value);

        if (value) {
          openVerificationModal("twoFactor");
        }
      }}
      classNames={{
        base: "scale-80 sm:scale-90 lg:scale-100 group-data-[selected=true]:bg-[#8C0000]",
        wrapper: "bg-[rgba(44,44,44,0.6)]",
        thumb: "w-[20px] h-[20px]",
      }}
    />
  );
};
