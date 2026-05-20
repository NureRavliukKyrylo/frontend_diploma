import {
  slotMatchesDate,
  type AvailabilitySlot,
} from "@entities/user/calendar";
import { isPast } from "@shared/libs/date";
import { useState, useCallback, useEffect, useRef, useMemo } from "react";

type MenuAnchor = Element | { getBoundingClientRect: () => DOMRect };

interface ContextMenuState {
  anchor: MenuAnchor;
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

  const handleClose = useCallback(() => setMenuState(null), []);

  useEffect(() => {
    const el = calendarRef.current;
    if (!el) return;

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();

      const makeAnchor = (): MenuAnchor => {
        const { clientX: x, clientY: y } = e;
        return {
          getBoundingClientRect: () =>
            ({
              x,
              y,
              top: y,
              bottom: y,
              left: x,
              right: x,
              width: 0,
              height: 0,
              toJSON: () => {},
            }) as DOMRect,
        };
      };

      const resolveDate = (cell: Element): Date | null => {
        const dateStr = cell.getAttribute("data-date");
        if (!dateStr) return null;
        const [yr, mo, dy] = dateStr.split("-").map(Number);
        return new Date(yr, mo - 1, dy);
      };

      const directCell = (e.target as Element).closest("[data-date]");
      if (directCell) {
        const date = resolveDate(directCell);
        if (!date || isPast(date)) return;
        const existingSlot =
          slots.find((s) => slotMatchesDate(s, date)) ?? null;
        setMenuState({ anchor: makeAnchor(), date, existingSlot });
        return;
      }

      const cols = el.querySelectorAll<Element>(".fc-timegrid-col[data-date]");
      for (const col of cols) {
        const { left, right } = col.getBoundingClientRect();
        if (e.clientX < left || e.clientX > right) continue;

        const date = resolveDate(col);
        if (!date || isPast(date)) return;
        const existingSlot =
          slots.find((s) => slotMatchesDate(s, date)) ?? null;
        setMenuState({ anchor: makeAnchor(), date, existingSlot });
        return;
      }
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

  return { calendarRef, menuState, menuItems, handleClose };
}
