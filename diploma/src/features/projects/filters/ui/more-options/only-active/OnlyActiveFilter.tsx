import { Switch } from "@shared/ui";
import styles from "../MoreOptionsFilter.module.scss";

interface OnlyActiveFilterProps {
  value?: boolean;
  onChange: (value: boolean) => void;
}

export const OnlyActiveFilter = ({
  value,
  onChange,
}: OnlyActiveFilterProps) => (
  <div className={styles.completedProject}>
    <h1 className={styles.titleFilterMoreOptions}>Show completed projects</h1>
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
