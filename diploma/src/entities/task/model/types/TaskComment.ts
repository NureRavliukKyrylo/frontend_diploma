export interface TaskComment {
  id: string;
  authorUserId: string;
  body: string;
  updatedAt: Date;
  parentCommentId: string | null;
  replyToUserId?: string | null;
  authorName: string;
  authorRoleName: string;
  authorAvatarUrl: string;
  replies: TaskComment[];
}
