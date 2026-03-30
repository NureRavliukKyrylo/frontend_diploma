export interface ParticipationMember {
  userId: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  role: { roleId: string; name: string };
}
