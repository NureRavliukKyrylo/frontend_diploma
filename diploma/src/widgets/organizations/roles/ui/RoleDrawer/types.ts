export interface RoleDrawerMember {
  id: string;
  userId: string;
  fullName: string;
  avatarUrl?: string | null;
  joinedLabel: string;
  level?: string | number | null;
}
