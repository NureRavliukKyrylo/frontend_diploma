export interface TaskComment {
  id: string;
  authorUserId: string;
  body: string;
  createdAt: Date;
  parentCommentId: string | null;
  replyToUserId?: string | null;
  author: {
    firstName: string;
    lastName: string;
    avatarUrl: string;
    roleName: string;
  };
  replies: TaskComment[];
}
