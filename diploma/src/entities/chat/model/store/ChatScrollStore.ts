import { create } from "zustand";

interface ChatScrollStore {
  pendingScrollChatId: string | null;
  targetMessageIds: Record<string, string | null>;
  notAtBottom: Record<string, boolean>;
  requestScrollToBottom: (chatId: string) => void;
  requestScrollToMessage: (chatId: string, messageId: string) => void;
  consumeScrollRequest: (chatId: string) => boolean;
  consumeTargetMessage: (chatId: string, messageId: string) => boolean;
  setNotAtBottom: (chatId: string, value: boolean) => void;
}

export const useChatScrollStore = create<ChatScrollStore>((set, get) => ({
  pendingScrollChatId: null,
  targetMessageIds: {},
  notAtBottom: {},
  requestScrollToBottom: (chatId) => set({ pendingScrollChatId: chatId }),
  requestScrollToMessage: (chatId, messageId) =>
    set((s) => ({
      targetMessageIds: { ...s.targetMessageIds, [chatId]: messageId },
    })),
  consumeScrollRequest: (chatId) => {
    const match = get().pendingScrollChatId === chatId;
    if (match) set({ pendingScrollChatId: null });
    return match;
  },
  consumeTargetMessage: (chatId, messageId) => {
    const match = get().targetMessageIds[chatId] === messageId;
    if (match) {
      set((s) => ({
        targetMessageIds: { ...s.targetMessageIds, [chatId]: null },
      }));
    }
    return match;
  },
  setNotAtBottom: (chatId, value) =>
    set((s) => ({ notAtBottom: { ...s.notAtBottom, [chatId]: value } })),
}));
