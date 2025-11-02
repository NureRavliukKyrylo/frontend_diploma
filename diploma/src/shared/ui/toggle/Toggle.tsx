import styles from "./Toggle.module.scss";
import type { TabOption } from "@shared/config";

interface ToggleProps<T extends string = string> {
  tabs: TabOption<T>[];
  activeValue: T;
  onChange: (value: T) => void;
  className?: string;
  buttonClassName?: string;
  activeButtonClassName?: string;
}

export const Toggle = <T extends string>({
  tabs,
  activeValue,
  onChange,
  className = "",
  buttonClassName = "",
  activeButtonClassName = "",
}: ToggleProps<T>) => {
  return (
    <div className={`${styles.toggleContainer} ${className}`.trim()}>
      {tabs.map((tab) => {
        const isActive = activeValue === tab.value;
        const buttonClasses = [
          styles.toggleButton,
          buttonClassName,
          isActive ? `${styles.active} ${activeButtonClassName}` : "",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <button
            key={tab.value}
            className={buttonClasses}
            onClick={() => onChange(tab.value)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};
