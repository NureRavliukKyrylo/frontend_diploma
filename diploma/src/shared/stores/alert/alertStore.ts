import { create } from "zustand";

type MessageType =
  | "success"
  | "warning"
  | "default"
  | "primary"
  | "secondary"
  | "danger";

interface AlertState {
  title: string | null;
  description: string | null;
  messageType: MessageType | null;
  variant: "faded" | "solid" | null;
  endContent?: React.ReactNode | null;
  isVisible: boolean;

  showAlert: (
    title: string,
    description: string,
    type: MessageType,
    variant?: "faded" | "solid",
    endContent?: React.ReactNode
  ) => void;

  hideAlert: () => void;
}

export const useAlertStore = create<AlertState>((set) => ({
  title: null,
  description: null,
  messageType: null,
  variant: null,
  endContent: null,
  isVisible: false,

  showAlert: (title, description, type, variant = "faded", endContent = null) =>
    set({
      title,
      description,
      messageType: type,
      variant,
      endContent,
      isVisible: true,
    }),

  hideAlert: () =>
    set({
      title: null,
      description: null,
      messageType: null,
      variant: null,
      endContent: null,
      isVisible: false,
    }),
}));
