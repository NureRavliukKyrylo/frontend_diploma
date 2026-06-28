import {
  useCallback,
  useLayoutEffect,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";

interface PortalMenuProps {
  isOpen: boolean;
  anchorRef: RefObject<HTMLElement | null>;
  className: string;
  children: ReactNode;
}

export const PortalMenu = ({
  isOpen,
  anchorRef,
  className,
  children,
}: PortalMenuProps) => {
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const updatePosition = useCallback(() => {
    const rect = anchorRef.current?.getBoundingClientRect();

    if (!rect) return;

    setPosition({
      top: rect.bottom + 8,
      left: rect.left,
      width: rect.width,
    });
  }, [anchorRef]);

  useLayoutEffect(() => {
    if (!isOpen) return undefined;

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen, updatePosition]);

  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <div
      className={className}
      style={{
        position: "fixed",
        top: position.top,
        left: position.left,
        minWidth: position.width,
        zIndex: 12000,
      }}
    >
      {children}
    </div>,
    document.body,
  );
};
