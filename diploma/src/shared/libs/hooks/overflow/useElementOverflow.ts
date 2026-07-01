import { useEffect, useRef, useState } from "react";

export const useElementOverflow = <T extends HTMLElement>(
  maxHeight: number,
  refreshKey: unknown,
) => {
  const elementRef = useRef<T>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      const element = elementRef.current;
      setIsOverflowing(Boolean(element && element.scrollHeight > maxHeight + 1));
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => window.removeEventListener("resize", checkOverflow);
  }, [maxHeight, refreshKey]);

  return { elementRef, isOverflowing };
};
