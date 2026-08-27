import { useEffect, useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { MessageForm } from "@features/chat";
import {
  clearFirstUnread,
  useChatScrollStore,
  useChatTypingEvents,
  useGetMessagesQueryKey,
  useMessageEvents,
  type Message,
  type MessageModeType,
} from "@entities/chat";
import { useChatStore } from "@entities/chat/model/store/useChatStore";
import { profileQuery } from "@entities/user/profile";
import { getFullName } from "@entities/user";
import { useSignalRSend } from "@shared/libs/hooks";
import { ChatDetailsModal } from "../../chat-details-modal/ui/ChatDetailsModal";
import { useChatHeaderData } from "../model/useChatHeaderData";
import { ChatFloatingControls } from "./ChatFloatingControls";
import { ChatHeader } from "./ChatHeader";
import { LeaveChatConfirmationModal } from "./LeaveChatConfirmationModal";
import styles from "./ChatContentWidget.module.scss";

interface ChatContentWidgetProps {
  chatId: string;
  children: ReactNode;
  leftContent?: ReactNode;
  mode: Record<
    MessageModeType,
    {
      isActive: boolean;
      message: Message | null;
    }
  >;
  onCancel: () => void;
}

export const ChatContentWidget = ({
  chatId,
  children,
  mode,
  onCancel,
  leftContent,
}: ChatContentWidgetProps) => {
  const { data: chat } = useChatHeaderData(chatId);
  const { data: user } = useQuery(profileQuery.all());
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const participantsNotUser = chat.participants.filter(
    (participant) => participant.id != user?.id,
  );
  const isPrivate = chat.relatedEntityType === "private";
  const notAtBottom = useChatScrollStore((state) => state.notAtBottom[chatId] ?? false);
  const requestScrollToBottom = useChatScrollStore(
    (state) => state.requestScrollToBottom,
  );
  const requestScrollToMessage = useChatScrollStore(
    (state) => state.requestScrollToMessage,
  );
  const send = useSignalRSend("chats");
  const typingUser = useChatStore((state) => state.typingByChat[chatId]);
  const typingParticipant = typingUser
    ? chat.participants.find((participant) => participant.id === typingUser.id)
    : null;
  const typingName = typingUser
    ? getFullName(typingUser.firstName, typingUser.lastName)
    : "";
  const getMessagesQueryKey = useGetMessagesQueryKey();

  useChatTypingEvents();
  useMessageEvents();

  useEffect(() => {
    send("JoinChat", chatId);
    return () => {
      send("LeaveChat", chatId);
      clearFirstUnread(getMessagesQueryKey(chatId));
    };
  }, [chatId]);

  return (
    <div className={styles.chatContentWrapper}>
      <ChatHeader
        chat={chat}
        leftContent={leftContent}
        onOpenDetails={() => setIsDetailsOpen(true)}
      />
      <div className={styles.chatBody}>
        {children}
        <ChatFloatingControls
          chatId={chatId}
          isTyping={Boolean(typingUser)}
          typingAvatarUrl={typingParticipant?.avatarUrl}
          typingName={typingName}
          notAtBottom={notAtBottom}
          unreadCount={chat.unreadCount}
          onScrollToBottom={() => requestScrollToBottom(chatId)}
          onScrollToMessage={(messageId) =>
            requestScrollToMessage(chatId, messageId)
          }
        />
      </div>
      <MessageForm
        replyToMessage={
          mode.reply.isActive
            ? {
                id: mode.reply.message!.id,
                content: mode.reply.message!.message,
                sender: getFullName(
                  mode.reply.message?.sender.firstName,
                  mode.reply.message?.sender.lastName,
                ),
              }
            : null
        }
        editingMessage={
          mode.edit.isActive
            ? {
                id: mode.edit.message!.id,
                content: mode.edit.message!.message,
              }
            : null
        }
        onCancel={onCancel}
        participants={participantsNotUser}
        chatId={chatId}
        hideMentionButton={isPrivate}
      />
      <ChatDetailsModal
        isOpen={isDetailsOpen}
        chat={chat}
        onClose={() => setIsDetailsOpen(false)}
        onLeaveChat={() => setIsLeaveModalOpen(true)}
        isLeaving={isLeaving}
      />
      <LeaveChatConfirmationModal
        chatId={chatId}
        chatName={chat.name}
        isOpen={isLeaveModalOpen}
        onClose={() => setIsLeaveModalOpen(false)}
        onAfterLeave={() => setIsDetailsOpen(false)}
        onPendingChange={setIsLeaving}
      />
    </div>
  );
};
