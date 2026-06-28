import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { getMessageSchema } from "../libs/messageSchema";
import { useEditMessage } from "../../edit-message";
import { useSendMessage } from "../../send-message";

interface UseMessageFormProps {
  chatId: string;
  replyToMessageId?: string;
  mentionedUserIds?: string[];
  editingMessage?: { id: string; content: string } | null;
  onCancel?: () => void;
  submitFallbackBody?: string;
  onAfterSubmit?: () => void;
}

export const useMessageForm = ({
  chatId,
  replyToMessageId = "",
  mentionedUserIds = [],
  editingMessage,
  onCancel,
  submitFallbackBody = "",
  onAfterSubmit,
}: UseMessageFormProps) => {
  const { t } = useTranslation(["chat"]);
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
    validationSchema: getMessageSchema(t),
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      const body = values.body.trim() ? values.body : submitFallbackBody;
      if (!body.trim()) return;
      if (editingMessage) {
        editMessage({ newContent: body });
      } else {
        sendMessage({
          message: body,
          replyToMessageId,
          mentionedUserIds,
        });
      }
      resetForm();
      onAfterSubmit?.();
    },
  });

  return { formik, isLoading: editingMessage ? isEditing : isSending };
};
