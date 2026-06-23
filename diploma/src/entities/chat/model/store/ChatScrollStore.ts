import { create } from "zustand";

interface ChatScrollStore {
  pendingScrollChatId: string | null;
  notAtBottom: Record<string, boolean>;
  requestScrollToBottom: (chatId: string) => void;
  consumeScrollRequest: (chatId: string) => boolean;
  setNotAtBottom: (chatId: string, value: boolean) => void;
}

export const useChatScrollStore = create<ChatScrollStore>((set, get) => ({
  pendingScrollChatId: null,
  notAtBottom: {},
  requestScrollToBottom: (chatId) => set({ pendingScrollChatId: chatId }),
  consumeScrollRequest: (chatId) => {
    const match = get().pendingScrollChatId === chatId;
    if (match) set({ pendingScrollChatId: null });
    return match;
  },
  setNotAtBottom: (chatId, value) =>
    set((s) => ({ notAtBottom: { ...s.notAtBottom, [chatId]: value } })),
}));
