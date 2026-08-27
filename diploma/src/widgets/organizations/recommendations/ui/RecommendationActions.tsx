import { Check, LoaderCircle, MessageCircle, UserPlus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useCreatePrivateChat } from "@features/chat/private-chat/model/useCreatePrivateChat";
import styles from "./RecommendationActions.module.scss";

interface RecommendationActionsProps {
  userId: string;
  displayName: string;
  isInvited: boolean;
  onInvite: () => void;
}

export const RecommendationActions = ({
  userId,
  displayName,
  isInvited,
  onInvite,
}: RecommendationActionsProps) => {
  const { t } = useTranslation("organizations");
  const privateChat = useCreatePrivateChat();

  return (
    <div className={styles.actions}>
      <button
        type="button"
        className={`${styles.inviteButton} ${
          isInvited ? styles.inviteButtonDone : ""
        }`}
        onClick={onInvite}
        disabled={isInvited}
      >
        {isInvited ? <Check size={18} /> : <UserPlus size={18} />}
        {isInvited
          ? t("recommendations.actions.invited")
          : t("recommendations.actions.invite")}
      </button>
      <button
        type="button"
        className={styles.chatButton}
        aria-label={t("recommendations.actions.messageAria", {
          name: displayName,
        })}
        onClick={() => privateChat.createPrivateChat(userId)}
        disabled={privateChat.isLoading}
      >
        {privateChat.isLoading ? (
          <LoaderCircle className={styles.spinner} size={20} />
        ) : (
          <MessageCircle size={20} />
        )}
      </button>
    </div>
  );
};
