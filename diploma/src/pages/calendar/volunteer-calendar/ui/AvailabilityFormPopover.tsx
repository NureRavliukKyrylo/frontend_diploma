import { SetAvailabilityForm } from "@features/calendar";
import { BasePopover } from "@shared/ui/modals";

interface AvailabilityFormPopoverProps {
  anchor: Element | { getBoundingClientRect: () => DOMRect };
  date: Date;
  start?: string;
  end?: string;
  onClose: () => void;
}

export const AvailabilityFormPopover = ({
  anchor,
  date,
  start,
  end,
  onClose,
}: AvailabilityFormPopoverProps) => (
  <BasePopover anchor={anchor} onClose={onClose}>
    <SetAvailabilityForm
      date={date}
      start={start}
      end={end}
      onClose={onClose}
    />
  </BasePopover>
);
