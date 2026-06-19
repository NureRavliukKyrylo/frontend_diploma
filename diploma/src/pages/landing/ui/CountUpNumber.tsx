import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

interface CountUpNumberProps {
  value: number;
  suffix: string;
}

export const CountUpNumber = ({ value, suffix }: CountUpNumberProps) => {
  const numberRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(numberRef, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    });

    return () => controls.stop();
  }, [isInView, value]);

  return (
    <span ref={numberRef}>
      {displayValue.toLocaleString("en-US")}
      {suffix}
    </span>
  );
};
