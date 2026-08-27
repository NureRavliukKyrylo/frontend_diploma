export type Message = {
  id: string;
  sender: {
    firstName: string;
    lastName: string;
    roleName: string;
    displayName: string;
    avatarUrl: string;
  };
  message: string;
  timestamp: string;
  editedAt: string;
  replyTo: {
    firstName: string;
    lastName: string;
    message: string;
  };
  mentions: { firstName: string; lastName: string }[];
  isMine: boolean;
  readStatus: "Unread" | "Read";
  isSystem: boolean;
  canSubmitReport?: boolean;
};
