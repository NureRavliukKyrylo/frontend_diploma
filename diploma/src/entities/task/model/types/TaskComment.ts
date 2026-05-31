export interface TaskComment {
  id: string;
  authorUserId: string;
  body: string;
  updatedAt: Date;
  parentCommentId: string | null;
  replyToUserId?: TaskComment[];
  authorName: string;
  authorRoleName: string;
}
