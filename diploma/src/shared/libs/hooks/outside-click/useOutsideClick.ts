import { useEffect, type RefObject } from "react";

export const useOutsideClick = (
  refs: RefObject<HTMLElement | null>[],
  callback: () => void,
) => {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (refs.every((ref) => !ref.current?.contains(e.target as Node))) {
        callback();
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [refs, callback]);
};
