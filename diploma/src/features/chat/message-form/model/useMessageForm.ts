import { useFormik } from "formik";
import { messageSchema } from "../libs/messageSchema";
import { useEditMessage } from "../../edit-message";
import { useSendMessage } from "../../send-message";

interface UseMessageFormProps {
  chatId: string;
  replyToMessageId?: string;
  mentionedUserIds?: string[];
  editingMessage?: { id: string; content: string } | null;
  onEditComplete?: () => void;
}

export const useMessageForm = ({
  chatId,
  replyToMessageId = "",
  mentionedUserIds = [],
  editingMessage,
  onEditComplete,
}: UseMessageFormProps) => {
  const { sendMessage, isLoading: isSending } = useSendMessage(chatId);
  const { editMessage, isLoading: isEditing } = useEditMessage(
    chatId,
    editingMessage?.id ?? "",
  );

  const formik = useFormik<{ body: string }>({
    initialValues: { body: editingMessage ? editingMessage.content : "" },
    validationSchema: messageSchema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      if (!values.body.trim()) return;
      if (editingMessage) {
        editMessage({ newContent: values.body });
        onEditComplete?.();
      } else {
        sendMessage({
          message: values.body,
          replyToMessageId,
          mentionedUserIds,
        });
      }
      resetForm();
    },
  });

  return { formik, isLoading: editingMessage ? isEditing : isSending };
};
