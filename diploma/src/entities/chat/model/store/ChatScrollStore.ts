import { create } from "zustand";

interface ChatScrollStore {
  pendingScrollChatId: string | null;
  requestScrollToBottom: (chatId: string) => void;
  consumeScrollRequest: (chatId: string) => boolean;
}

export const useChatScrollStore = create<ChatScrollStore>((set, get) => ({
  pendingScrollChatId: null,
  requestScrollToBottom: (chatId) => set({ pendingScrollChatId: chatId }),
  consumeScrollRequest: (chatId) => {
    const match = get().pendingScrollChatId === chatId;
    if (match) set({ pendingScrollChatId: null });
    return match;
  },
}));
