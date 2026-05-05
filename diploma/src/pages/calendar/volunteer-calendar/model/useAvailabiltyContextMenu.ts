import { useState, useCallback, useEffect, useRef, useMemo } from "react";

export interface AvailabilitySlot {
  day: Date;
  start: string;
  end: string;
}

interface ContextMenuState {
  anchor: Element;
  date: Date;
  existingSlot: AvailabilitySlot | null;
}

interface UseAvailabilityContextMenuProps {
  slots: AvailabilitySlot[];
  onAdd: (date: Date) => void;
  onUpdate: (slot: AvailabilitySlot, date: Date) => void;
  onDelete: (slot: AvailabilitySlot) => void;
}

export function useAvailabilityContextMenu({
  slots,
  onAdd,
  onUpdate,
  onDelete,
}: UseAvailabilityContextMenuProps) {
  const [menuState, setMenuState] = useState<ContextMenuState | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const handleClose = useCallback(() => setMenuState(null), []);

  useEffect(() => {
    const el = calendarRef.current;
    if (!el) return;

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();

      const cell = (e.target as Element).closest("[data-date]");
      if (!cell) return;

      const dateStr = cell.getAttribute("data-date");
      if (!dateStr) return;

      const date = new Date(dateStr);
      const existingSlot = slots.find((s) => isSameDay(s.day, date)) ?? null;

      setMenuState({ anchor: cell, date, existingSlot });
    };

    el.addEventListener("contextmenu", handleContextMenu);
    return () => el.removeEventListener("contextmenu", handleContextMenu);
  }, [slots]);

  const menuItems = useMemo(() => {
    if (!menuState) return [];

    if (menuState.existingSlot) {
      return [
        {
          key: "update" as const,
          label: "Update availability",
          variant: "update" as const,
          onClick: () => {
            onUpdate(menuState.existingSlot!, menuState.date);
            handleClose();
          },
        },
        {
          key: "delete" as const,
          label: "Delete availability",
          variant: "delete" as const,
          onClick: () => {
            onDelete(menuState.existingSlot!);
            handleClose();
          },
        },
      ];
    }

    return [
      {
        key: "assign" as const,
        label: "Add availability",
        variant: "assign" as const,
        onClick: () => {
          onAdd(menuState.date);
          handleClose();
        },
      },
    ];
  }, [menuState, onAdd, onUpdate, onDelete, handleClose]);

  return {
    calendarRef,
    menuState,
    menuItems,
    handleClose,
  };
}
