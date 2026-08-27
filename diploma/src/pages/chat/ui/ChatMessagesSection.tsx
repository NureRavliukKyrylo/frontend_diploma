import {
  MessageItem,
  SystemMessageItem,
  useChatMessagesQuery,
} from "@entities/chat";
import { useTranslation } from "react-i18next";
import { useChatPage } from "../model/useChatPage";
import { Suspense } from "react";
import { MessagesListSkeleton, MessagesListWidget } from "@widgets/chat";
import styles from "./ChatPage.module.scss";

interface ChatMessagesSectionProps {
  chatId: string;
  getMenuItems: ReturnType<typeof useChatPage>["getMenuItems"];
  openId: string | null;
  setOpenId: (id: string | null) => void;
}

export const ChatMessagesSection = ({
  chatId,
  getMenuItems,
  openId,
  setOpenId,
}: ChatMessagesSectionProps) => {
  const { hook } = useChatMessagesQuery(chatId);
  const { t } = useTranslation(["chat"]);

  return (
    <Suspense
      key={chatId}
      fallback={
        <MessagesListSkeleton className={styles.wrapperMessagesSkeleton} />
      }
    >
      <MessagesListWidget
        useMessagesQuery={hook}
        renderCard={(message) =>
          message.isSystem ? (
            <SystemMessageItem message={message} />
          ) : (
            <MessageItem
              message={message}
              menuItems={getMenuItems(message, t)}
              openId={openId}
              setOpenId={setOpenId}
            />
          )
        }
        className={styles.wrapperMessages}
        chatId={chatId}
      />
    </Suspense>
  );
};
