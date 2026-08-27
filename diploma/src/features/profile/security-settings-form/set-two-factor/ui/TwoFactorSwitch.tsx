import { Switch } from "@shared/ui";
import { useEnableTwoFactor } from "../model/useEnableTwoFactor";
import { useDisableTwoFactor } from "../model/useDisableTwoFactor";
import { useQuery } from "@tanstack/react-query";
import { profileQuery } from "@entities/user/profile";

export const TwoFactorSwitch = () => {
  const { data: user } = useQuery(profileQuery.all());

  const { enableTwoFactor, isLoading: isEnabling } = useEnableTwoFactor();
  const { disableTwoFactor, isLoading: isDisabling } = useDisableTwoFactor();

  const isLoading = isEnabling || isDisabling;

  const handleChange = (value: boolean) => {
    if (value) {
      enableTwoFactor();
    } else {
      disableTwoFactor();
    }
  };

  return (
    <Switch
      isSelected={user?.twoFactorEnabled}
      onValueChange={handleChange}
      isDisabled={isLoading}
      classNames={{
        base: "scale-80 sm:scale-90 lg:scale-100 ",
        wrapper:
          "bg-[rgba(44,44,44,0.3)] group-data-[selected=true]:bg-[#8C0000]",
        thumb: "w-[20px] h-[20px]",
      }}
    />
  );
};
