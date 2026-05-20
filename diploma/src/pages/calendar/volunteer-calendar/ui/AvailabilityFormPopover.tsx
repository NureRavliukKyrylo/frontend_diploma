import type { AvailabilitySlot } from "@entities/user/calendar";
import { SetAvailabilityForm } from "@features/calendar";
import { BasePopover } from "@shared/ui/modals";

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
}: AvailabilityFormPopoverProps) => (
  <BasePopover anchor={anchor} onClose={onClose}>
    <SetAvailabilityForm
      date={date}
      availability={availability}
      onClose={onClose}
    />
  </BasePopover>
);
