import {
  AlertTriangle,
  Award,
  Flag,
  Gavel,
  LogIn,
  LogOut,
  Shapes,
  Tag,
  type LucideIcon,
} from "lucide-react";
import type { AdminRequestTypeName } from "@entities/admin";

export interface RequestVisual {
  icon: LucideIcon;
  bg: string;
  color: string;
  accent: string;
  shadow: string;
}

const joinVisual: RequestVisual = {
  icon: LogIn,
  bg: "#e6f1fb",
  color: "#185fa5",
  accent: "#185fa5",
  shadow: "rgba(24, 95, 165, 0.1)",
};

const leaveVisual: RequestVisual = {
  icon: LogOut,
  bg: "#f1efe8",
  color: "#5f5e5a",
  accent: "#5f5e5a",
  shadow: "rgba(95, 94, 90, 0.1)",
};

const catalogVisual: RequestVisual = {
  icon: Tag,
  bg: "#f1efe8",
  color: "#5f5e5a",
  accent: "#5f5e5a",
  shadow: "rgba(95, 94, 90, 0.1)",
};

const unsupportedVisual: RequestVisual = {
  icon: AlertTriangle,
  bg: "#f1efe8",
  color: "#999999",
  accent: "#cccccc",
  shadow: "rgba(0, 0, 0, 0.06)",
};

export const requestVisuals: Partial<Record<AdminRequestTypeName, RequestVisual>> = {
  organizationJoin: joinVisual,
  projectJoin: joinVisual,
  eventJoin: joinVisual,
  taskJoin: joinVisual,
  organizationLeave: leaveVisual,
  projectLeave: leaveVisual,
  eventLeave: leaveVisual,
  taskLeave: leaveVisual,
  skillCreation: catalogVisual,
  categoryCreation: { ...catalogVisual, icon: Shapes },
  badgeAward: {
    icon: Award,
    bg: "#e6f6ec",
    color: "#1a7a45",
    accent: "#1a7a45",
    shadow: "rgba(26, 122, 69, 0.1)",
  },
  report: {
    icon: Flag,
    bg: "#fbeaea",
    color: "#8b0000",
    accent: "#8b0000",
    shadow: "rgba(139, 0, 0, 0.1)",
  },
  appeal: {
    icon: Gavel,
    bg: "#fbeaea",
    color: "#8b0000",
    accent: "#8b0000",
    shadow: "rgba(139, 0, 0, 0.1)",
  },
  categoryUpdate: unsupportedVisual,
  categoryDeletion: unsupportedVisual,
};

export const fallbackVisual: RequestVisual = unsupportedVisual;
