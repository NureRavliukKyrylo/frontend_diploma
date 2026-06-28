import { formatAdminCount } from "@entities/admin";
import type { LucideIcon } from "lucide-react";

interface ActivityCounterProps {
  icon: LucideIcon;
  value: number;
  label: string;
}

export const ActivityCounter = ({
  icon: Icon,
  value,
  label,
}: ActivityCounterProps) => (
  <span>
    <Icon size={18} aria-hidden="true" />
    <strong>{formatAdminCount(value)}</strong>
    <small>{label}</small>
  </span>
);
