import { type ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  useFloating,
  autoUpdate,
  offset,
  shift,
  flip,
} from "@floating-ui/react";
import styles from "./BasePopover.module.scss";

interface BasePopoverProps {
  anchor: Element | { getBoundingClientRect: () => DOMRect };
  children: ReactNode;
  onClose: () => void;
  placement?:
    | "right-start"
    | "left-start"
    | "bottom-start"
    | "top-start"
    | "right";
  closeOnScroll?: boolean;
  center?: boolean;
}

export const BasePopover = ({
  anchor,
  children,
  onClose,
  placement = "right-start",
  closeOnScroll = false,
  center = false,
}: BasePopoverProps) => {
  const { refs, floatingStyles } = useFloating({
    whileElementsMounted: autoUpdate,
    placement,
    middleware: [offset(12), flip(), shift({ padding: 8 })],
  });

  useEffect(() => {
    refs.setReference(anchor);
  }, [anchor]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        refs.floating.current &&
        !refs.floating.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKey);
    if (closeOnScroll) document.addEventListener("scroll", onClose, true);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKey);
      if (closeOnScroll) document.removeEventListener("scroll", onClose, true);
    };
  }, [onClose, closeOnScroll]);

  return createPortal(
    <>
      {center && <div className={styles.backdrop} onClick={onClose} />}
      <div
        ref={refs.setFloating}
        style={center ? { zIndex: 9999 } : { ...floatingStyles, zIndex: 9999 }}
        className={center ? styles.centered : undefined}
      >
        {children}
      </div>
    </>,
    document.body,
  );
};
