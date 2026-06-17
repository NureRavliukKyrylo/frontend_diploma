export interface TaskComment {
  id: string;
  body: string;
  createdAt: Date;
  parentCommentId: string | null;
  replyToUserId?: string | null;
  author: {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl: string;
    roleName: string;
  };
  replies: TaskComment[];
}
