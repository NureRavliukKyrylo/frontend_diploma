import styles from "./Toggle.module.scss";
import type { TabOption } from "@shared/config/types";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface ToggleProps<T extends string = string> {
  tabs: TabOption<T>[];
  activeValue: T;
  onChange: (value: T) => void;
  className?: string;
  buttonClassName?: string;
  activeButtonClassName?: string;
  pillClassName?: string;
  innerWrapperClassName?: string;
}

export const Toggle = <T extends string>({
  tabs,
  activeValue,
  onChange,
  className = "",
  buttonClassName = "",
  activeButtonClassName = "",
  pillClassName = "",
  innerWrapperClassName = "",
}: ToggleProps<T>) => {
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [pill, setPill] = useState<{ left: number; width: number } | null>(
    null,
  );

  useEffect(() => {
    const activeBtn = buttonRefs.current.get(activeValue);
    if (!activeBtn) return;

    const update = () => {
      setPill({
        left: activeBtn.offsetLeft,
        width: activeBtn.offsetWidth,
      });
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(activeBtn);

    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [activeValue]);

  return (
    <div className={`${styles.toggleContainer} ${className}`.trim()}>
      <div
        className={`${styles.innerToggleWrapper} ${innerWrapperClassName}`.trim()}
      >
        {pill && (
          <motion.div
            className={`${styles.pill} ${pillClassName}`.trim()}
            initial={false}
            animate={{ left: pill.left, width: pill.width }}
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          />
        )}
        {tabs.map((tab) => {
          const isActive = activeValue === tab.value;
          return (
            <button
              key={tab.value}
              ref={(el) => {
                if (el) buttonRefs.current.set(tab.value, el);
              }}
              className={[
                styles.toggleButton,
                buttonClassName,
                isActive ? styles.active : "",
                isActive ? activeButtonClassName : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => onChange(tab.value)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
