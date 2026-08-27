import { getFullName } from "@entities/user";
import { useTypingMessage } from "@entities/chat";
import { useState } from "react";
import { useMessageForm } from "../../model/useMessageForm";
import {
  MentionButton,
  type Participant,
} from "../mention-button/MentionButton";
import { ComposerTextarea } from "./ComposerTextarea";
import { MentionPickerChips } from "./MentionPickerChips";
import { ReplyEditBanner } from "./ReplyEditBanner";
import styles from "./MessageForm.module.scss";

interface MessageFormProps {
  chatId: string;
  participants?: Participant[];
  replyToMessage?: { id: string; content: string; sender: string } | null;
  mentionedUserIds?: string[];
  editingMessage?: { id: string; content: string } | null;
  hideMentionButton?: boolean;
  onCancel?: () => void;
}

export const MessageForm = ({
  chatId,
  participants = [],
  replyToMessage,
  mentionedUserIds = [],
  editingMessage,
  onCancel,
  hideMentionButton = false,
}: MessageFormProps) => {
  const isEditing = Boolean(editingMessage);
  const isReplying = Boolean(replyToMessage) && !isEditing;
  const [mentionIds, setMentionIds] = useState<string[]>(mentionedUserIds);
  const mentionedParticipants = participants.filter((participant) =>
    mentionIds.includes(participant.id),
  );
  const mentionFallbackBody = mentionedParticipants
    .map((participant) =>
      `@${getFullName(participant.firstName, participant.lastName)}`,
    )
    .join(" ");
  const { formik, isLoading } = useMessageForm({
    chatId,
    replyToMessageId: replyToMessage?.id,
    mentionedUserIds: mentionIds,
    editingMessage,
    onCancel,
    submitFallbackBody: mentionFallbackBody,
    onAfterSubmit: () => setMentionIds([]),
  });
  const sendTyping = useTypingMessage(chatId);
  const hasError = formik.submitCount > 0 && Boolean(formik.errors.body);
  const canSend = Boolean(formik.values.body.trim()) || mentionIds.length > 0;

  const toggleMention = (id: string) => {
    setMentionIds((prev) =>
      prev.includes(id) ? prev.filter((mentionId) => mentionId !== id) : [...prev, id],
    );
  };

  const removeMention = (id: string) => {
    setMentionIds((prev) => prev.filter((mentionId) => mentionId !== id));
  };

  return (
    <form onSubmit={formik.handleSubmit} className={styles.wrapper}>
      <ReplyEditBanner
        isEditing={isEditing}
        isReplying={isReplying}
        replyToMessage={replyToMessage}
        editingMessage={editingMessage}
        onCancel={onCancel}
      />

      <div className={styles.sendMessageWrapper}>
        {!hideMentionButton && (
          <MentionButton
            participants={participants}
            mentionIds={mentionIds}
            onToggle={toggleMention}
          />
        )}

        <ComposerTextarea
          formik={formik}
          isEditing={isEditing}
          isLoading={isLoading}
          hasError={hasError}
          canSend={canSend}
          editingMessage={editingMessage}
          sendTyping={sendTyping}
          mentionChips={
            <MentionPickerChips
              participants={mentionedParticipants}
              onRemove={removeMention}
            />
          }
        />
      </div>
    </form>
  );
};
