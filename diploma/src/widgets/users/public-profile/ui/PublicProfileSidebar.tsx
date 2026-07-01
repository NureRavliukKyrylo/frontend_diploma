import {
  Check,
  ExternalLink,
  LoaderCircle,
  MessageCircle,
  UserPlus,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { ProfileAvatar } from "@entities/user";
import type {
  PublicProfileSocialLink,
  PublicUserProfile,
} from "@entities/user/profile";
import { DefaultAvatar } from "@shared/assets/images/user";
import styles from "./PublicProfileSidebar.module.scss";

interface PublicProfileSidebarProps {
  profile: PublicUserProfile;
  fullName: string;
  canInvite: boolean;
  isInvited: boolean;
  isInviting: boolean;
  isOpeningChat: boolean;
  onInvite: () => void;
  onMessage: () => void;
}

const SocialLinks = ({ links }: { links: PublicProfileSocialLink[] }) => {
  if (links.length === 0) return null;

  return (
    <div className={styles.socialLinks}>
      {links.map((link) => (
        <a
          key={`${link.platform}-${link.url}`}
          href={link.url}
          target="_blank"
          rel="noreferrer"
          aria-label={link.platform}
        >
          <span>{link.platform}</span>
          <ExternalLink size={14} />
        </a>
      ))}
    </div>
  );
};

export const PublicProfileSidebar = ({
  profile,
  fullName,
  canInvite,
  isInvited,
  isInviting,
  isOpeningChat,
  onInvite,
  onMessage,
}: PublicProfileSidebarProps) => {
  const { t } = useTranslation("common");

  return (
    <aside className={styles.sidebar}>
    <div className={styles.avatar}>
      <ProfileAvatar
        avatar={profile.profile?.avatarUrl ?? DefaultAvatar}
        level={profile.progress.level ?? 1}
      />
    </div>
    <div className={styles.identity}>
      <h1>{fullName}</h1>
      <span>{profile.roleName || t("publicProfile.volunteer")}</span>
    </div>

    <div className={styles.actions}>
      {canInvite && (
        <button
          type="button"
          className={`${styles.inviteButton} ${
            isInvited ? styles.inviteButtonDone : ""
          }`}
          onClick={onInvite}
          disabled={isInvited || isInviting}
        >
          {isInviting ? (
            <LoaderCircle className={styles.spinner} size={18} />
          ) : isInvited ? (
            <Check size={18} />
          ) : (
            <UserPlus size={18} />
          )}
          {isInvited
            ? t("publicProfile.actions.invited")
            : t("publicProfile.actions.invite")}
        </button>
      )}
      <button
        type="button"
        className={styles.messageButton}
        onClick={onMessage}
        disabled={isOpeningChat}
      >
        {isOpeningChat ? (
          <LoaderCircle className={styles.spinner} size={18} />
        ) : (
          <MessageCircle size={18} />
        )}
        {t("publicProfile.actions.message")}
      </button>
    </div>

    <SocialLinks links={profile.profile?.socialLinks ?? []} />
    </aside>
  );
};
