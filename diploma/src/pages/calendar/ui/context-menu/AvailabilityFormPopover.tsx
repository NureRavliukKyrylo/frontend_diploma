import type { AvailabilitySlot } from "@entities/user/calendar";
import { SetAvailabilityForm } from "@features/calendar";
import { BasePopover } from "@shared/ui/modals";
import { useMediaQuery } from "usehooks-ts";

interface AvailabilityFormPopoverProps {
  anchor: Element | { getBoundingClientRect: () => DOMRect };
  date: Date;
  availability?: AvailabilitySlot;
  onClose: () => void;
}

export const AvailabilityFormPopover = ({
  anchor,
  date,
  availability,
  onClose,
}: AvailabilityFormPopoverProps) => {
  const isTablet = useMediaQuery("(max-width: 900px)");
  return (
    <BasePopover
      anchor={anchor}
      onClose={onClose}
      placement={isTablet ? "bottom-start" : "right"}
      center={isTablet}
    >
      <SetAvailabilityForm
        date={date}
        availability={availability}
        onClose={onClose}
      />
    </BasePopover>
  );
};
