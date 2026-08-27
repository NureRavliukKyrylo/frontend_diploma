import { useEffect, useRef, useState } from "react";

interface UseIntersectionRevealOptions {
  threshold?: number;
  once?: boolean;
}

export const useIntersectionReveal = <T extends Element>({
  threshold = 0.4,
  once = true,
}: UseIntersectionRevealOptions = {}) => {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, once]);

  return { ref, isVisible };
};
