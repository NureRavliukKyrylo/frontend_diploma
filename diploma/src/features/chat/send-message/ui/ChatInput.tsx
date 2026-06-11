import { useState } from "react";
import { useSendMessage } from "../model/useSendMessage";

interface ChatInputProps {
  chatId: string;
}

export const ChatInput = ({ chatId }: ChatInputProps) => {
  const [value, setValue] = useState("");
  const { sendMessage, isLoading } = useSendMessage(chatId);

  const handleSend = () => {
    if (!value.trim()) return;
    sendMessage({ message: value, replyToMessageId: "", mentionedUserIds: [] });
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div style={{ display: "flex", gap: 8, padding: 12 }}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        disabled={isLoading}
        style={{
          flex: 1,
          padding: "8px 12px",
          borderRadius: 20,
          border: "1px solid #cbc9c9",
        }}
      />
      <button
        onClick={handleSend}
        disabled={isLoading || !value.trim()}
        style={{
          padding: "8px 16px",
          borderRadius: 20,
          background: "#8c0000",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Send
      </button>
    </div>
  );
};
