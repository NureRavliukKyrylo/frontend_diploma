import { useFormik } from "formik";
import { messageSchema } from "../libs/messageSchema";
import { useEditMessage } from "../../edit-message";
import { useSendMessage } from "../../send-message";

interface UseMessageFormProps {
  chatId: string;
  replyToMessageId?: string;
  mentionedUserIds?: string[];
  editingMessage?: { id: string; content: string } | null;
  onCancel?: () => void;
}

export const useMessageForm = ({
  chatId,
  replyToMessageId = "",
  mentionedUserIds = [],
  editingMessage,
  onCancel,
}: UseMessageFormProps) => {
  const { sendMessage, isLoading: isSending } = useSendMessage(
    chatId,
    onCancel,
  );
  const { editMessage, isLoading: isEditing } = useEditMessage(
    chatId,
    editingMessage?.id ?? "",
    onCancel,
  );

  const formik = useFormik<{ body: string }>({
    initialValues: { body: editingMessage ? editingMessage.content : "" },
    validationSchema: messageSchema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      if (!values.body.trim()) return;
      if (editingMessage) {
        editMessage({ newContent: values.body });
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
