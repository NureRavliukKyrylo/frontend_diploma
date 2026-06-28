import {
  sendAdminUserCommunication,
  type AdminUserListItem,
} from "@entities/admin";
import { addToast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import { getErrorMessage } from "@shared/libs/error-message";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { BaseModal } from "@shared/ui/modals";
import { useFormik } from "formik";
import { Check, Send, X } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import styles from "./AdminMessageUserModal.module.scss";

interface AdminMessageUserModalProps {
  user: AdminUserListItem | null;
  onClose: () => void;
}

interface MessageFormValues {
  sendNotification: boolean;
  sendEmail: boolean;
  subjectOrTitle: string;
  message: string;
}

const getInitials = (user: AdminUserListItem) => {
  const fullName = `${user.firstName} ${user.lastName}`.trim();
  const source = user.displayName || fullName || user.email;
  const initials = source
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return initials || "IF";
};

const getUserName = (user: AdminUserListItem) => {
  const fullName = `${user.firstName} ${user.lastName}`.trim();
  return user.displayName || fullName || user.email || "Unknown user";
};

const getDeliveryDescription = ({
  emailSent,
  notificationSent,
}: {
  emailSent: boolean;
  notificationSent: boolean;
}) => {
  if (emailSent && notificationSent) {
    return "In-app notification and email were delivered.";
  }

  if (notificationSent) {
    return "In-app notification was delivered.";
  }

  if (emailSent) {
    return "Email was delivered.";
  }

  return "The backend accepted the request, but no delivery channel was confirmed.";
};

const validationSchema = Yup.object({
  sendNotification: Yup.boolean().required(),
  sendEmail: Yup.boolean().required(),
  subjectOrTitle: Yup.string().required("Subject is required").max(200),
  message: Yup.string().required("Message is required").max(5000),
}).test(
  "at-least-one-channel",
  "Select at least one channel",
  (value) => Boolean(value?.sendNotification || value?.sendEmail),
);

export const AdminMessageUserModal = ({
  user,
  onClose,
}: AdminMessageUserModalProps) => {
  const { t } = useTranslation("common");
  const hasEmail = Boolean(user?.email);
  const mutation = useMutation({
    mutationFn: (values: MessageFormValues) => {
      if (!user) {
        throw new Error("User is not selected");
      }

      return sendAdminUserCommunication({
        userId: user.userId,
        sendEmail: values.sendEmail,
        sendNotification: values.sendNotification,
        subjectOrTitle: values.subjectOrTitle.trim(),
        message: values.message.trim(),
      });
    },
    onSuccess: (result) => {
      addToast({
        title: "Message sent",
        description: getDeliveryDescription(result),
        color: "success",
      });
      handleClose();
    },
    onError: (error) => {
      addToast({
        title: "Message failed",
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });
  const formik = useFormik<MessageFormValues>({
    initialValues: {
      sendNotification: true,
      sendEmail: false,
      subjectOrTitle: "",
      message: "",
    },
    validationSchema,
    onSubmit: (values) => mutation.mutate(values),
  });
  const channelsError =
    formik.submitCount > 0 && typeof formik.errors === "string"
      ? formik.errors
      : formik.submitCount > 0 &&
          !formik.values.sendNotification &&
          !formik.values.sendEmail
        ? "Select at least one channel"
        : "";

  function handleClose() {
    if (mutation.isPending) {
      return;
    }

    formik.resetForm();
    mutation.reset();
    onClose();
  }

  useEffect(() => {
    if (!hasEmail && formik.values.sendEmail) {
      formik.setFieldValue("sendEmail", false, false);
    }
  }, [formik, hasEmail]);

  if (!user) {
    return null;
  }

  const userName = getUserName(user);

  return (
    <BaseModal
      isOpen={Boolean(user)}
      onClose={handleClose}
      maxWidth="620px"
      showClosed={false}
    >
      <form onSubmit={formik.handleSubmit} className={styles.wrapper}>
        <div className={styles.header}>
          <button
            type="button"
            className={styles.closeButton}
            onClick={handleClose}
            aria-label="Close message dialog"
          >
            <X size={18} aria-hidden="true" />
          </button>
          <h1 className={styles.title}>Message user</h1>
          <div className={styles.recipientLine}>
            <span className={styles.recipientAvatar}>
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt={userName} />
              ) : (
                getInitials(user)
              )}
            </span>
            <span>to {userName}</span>
          </div>
        </div>

        <div className={styles.channels}>
          <button
            type="button"
            className={styles.channelOption}
            onClick={() =>
              formik.setFieldValue(
                "sendNotification",
                !formik.values.sendNotification,
              )
            }
          >
            <span
              className={`${styles.channelCheckbox} ${
                formik.values.sendNotification
                  ? styles.channelCheckboxChecked
                  : styles.channelCheckboxUnchecked
              }`}
            >
              {formik.values.sendNotification && <Check size={14} />}
            </span>
            In-app notification
          </button>

          <button
            type="button"
            className={styles.channelOption}
            disabled={!hasEmail}
            onClick={() =>
              hasEmail &&
              formik.setFieldValue("sendEmail", !formik.values.sendEmail)
            }
          >
            <span
              className={`${styles.channelCheckbox} ${
                formik.values.sendEmail
                  ? styles.channelCheckboxChecked
                  : styles.channelCheckboxUnchecked
              }`}
            >
              {formik.values.sendEmail && <Check size={14} />}
            </span>
            Email
          </button>
        </div>

        {!hasEmail && (
          <div className={styles.inlineWarning}>This user has no email address.</div>
        )}
        {channelsError && (
          <div className={styles.inlineWarning}>{channelsError}</div>
        )}

        <label className={styles.field}>
          <span className={styles.fieldLabel}>Subject / title</span>
          <input
            name="subjectOrTitle"
            value={formik.values.subjectOrTitle}
            onChange={formik.handleChange}
            maxLength={200}
            className={styles.fieldInput}
            placeholder="Short message title"
          />
          <span className={styles.charCounter}>
            {formik.values.subjectOrTitle.length} / 200
          </span>
          {formik.submitCount > 0 && formik.errors.subjectOrTitle && (
            <span className={styles.error}>{formik.errors.subjectOrTitle}</span>
          )}
        </label>

        <label className={styles.field}>
          <span className={styles.fieldLabel}>Message</span>
          <textarea
            name="message"
            value={formik.values.message}
            onChange={formik.handleChange}
            maxLength={5000}
            className={styles.fieldTextarea}
            placeholder="Write the message that should be sent to this user"
          />
          <span className={styles.charCounter}>
            {formik.values.message.length} / 5000
          </span>
          {formik.submitCount > 0 && formik.errors.message && (
            <span className={styles.error}>{formik.errors.message}</span>
          )}
        </label>

        <div className={styles.footer}>
          <BaseButtonWrapper
            type="button"
            className={styles.cancelButton}
            onClick={handleClose}
          >
            Cancel
          </BaseButtonWrapper>
          <BaseButtonWrapper
            type="submit"
            className={styles.submitButton}
            loading={mutation.isPending}
            disabled={
              !formik.values.sendEmail && !formik.values.sendNotification
            }
          >
            <Send size={16} aria-hidden="true" />
            Send message
          </BaseButtonWrapper>
        </div>

        {mutation.isError && (
          <div className={styles.error}>{getErrorMessage(mutation.error, t)}</div>
        )}
      </form>
    </BaseModal>
  );
};
