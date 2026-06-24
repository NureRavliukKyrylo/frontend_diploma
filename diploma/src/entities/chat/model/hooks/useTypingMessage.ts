import { useSignalRSend } from "@shared/libs/hooks";
import { useCallback, useRef } from "react";
import throttle from "lodash/throttle";

export function useTypingMessage(chatId: string) {
  const send = useSignalRSend("chats");
  const stopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setTyping = useRef(
    throttle(
      (isTyping: boolean, invoke: typeof send, id: string) => {
        invoke("SetTyping", id, isTyping);
      },
      2000,
      { trailing: false },
    ),
  ).current;

  return useCallback(
    (isTyping: boolean) => {
      setTyping(isTyping, send, chatId);

      if (isTyping) {
        if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
        stopTimerRef.current = setTimeout(() => {
          send("SetTyping", chatId, false);
        }, 5000);
      } else {
        if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
      }
    },
    [send, chatId],
  );
}
