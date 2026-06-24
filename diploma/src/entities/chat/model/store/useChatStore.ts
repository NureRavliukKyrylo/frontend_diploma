import { create } from "zustand";

interface TypingUser {
  id: string;
  firstName: string;
  lastName: string;
}

interface ChatStoreState {
  typingByChat: Record<string, TypingUser | null>;
  setTyping: (chatId: string, user: TypingUser | null) => void;
}

export const useChatStore = create<ChatStoreState>((set) => ({
  typingByChat: {},
  setTyping: (chatId, user) =>
    set((state) => ({
      typingByChat: { ...state.typingByChat, [chatId]: user },
    })),
}));
