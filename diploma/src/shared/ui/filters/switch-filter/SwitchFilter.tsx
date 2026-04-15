import { Switch } from "@shared/ui";
import styles from "./SwitchFilter.module.scss";

interface SwitchFilterProps {
  label: string;
  value?: boolean;
  onChange: (value: boolean) => void;
}

export const SwitchFilter = ({ label, value, onChange }: SwitchFilterProps) => (
  <div className={styles.switchFilter}>
    <h1 className={styles.titleSwitchFilter}>{label}</h1>
    <Switch
      isSelected={value}
      onValueChange={onChange}
      classNames={{
        base: "scale-80 sm:scale-90 lg:scale-95",
        wrapper:
          "bg-[rgba(44,44,44,0.3)] group-data-[selected=true]:bg-[#8C0000]",
        thumb: "w-[20px] h-[20px]",
      }}
    />
  </div>
);
