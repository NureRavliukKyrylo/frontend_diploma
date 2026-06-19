export interface OrganizationMemberCardModel {
  userId: string;
  participationId?: string | null;
  fullName: string;
  avatarUrl?: string | null;
  isOwner: boolean;
  roleId?: string | null;
  roleName: string;
  level?: number | null;
  rating?: number | null;
  ratingCount?: number | null;
  totalHours?: number | null;
  primaryStatValue: string;
  primaryStatLabel: string;
  secondaryStatValue: string;
  secondaryStatLabel: string;
  joinedAtLabel?: string | null;
}
