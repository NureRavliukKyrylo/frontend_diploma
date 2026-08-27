export interface AdminPagedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface AdminUserListItem {
  userId: string;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  roleName: string;
  avatarUrl?: string | null;
  emailVerified: boolean;
  googleConnected: boolean;
  googleCalendarConnected: boolean;
  registeredAt: string;
  balanceMinutes: number;
  availableMinutes: number;
  reservedMinutes: number;
  currentLevelCode?: string | null;
}

export interface AdminUsersParams {
  Search?: string;
  RoleName?: string;
  EmailVerified?: boolean;
  GoogleConnected?: boolean;
  RegisteredFrom?: string;
  RegisteredTo?: string;
  OrderBy?: "Newest" | "Oldest" | "Email" | "Name" | "Role";
  Page?: number;
  PageSize?: number;
}

export interface AdminBan {
  id: string;
  userId: string;
  caseId?: string | null;
  reason: string;
  createdByUserId: string;
  createdAt: string;
  expiresAt?: string | null;
  revokedAt?: string | null;
  revokedByUserId?: string | null;
  revokeReason?: string | null;
}

export interface AdminSystemRolesParams {
  Search?: string;
  OrderBy?: "Default" | "NameAsc" | "NameDesc";
  Page?: number;
  PageSize?: number;
}

export interface AdminSystemRole {
  id: string;
  name: string;
  description?: string | null;
  level: number;
  isTemplate: boolean;
  isSystemGenerated: boolean;
  isDefaultForJoin: boolean;
  entityType?: string | null;
  entityId?: string | null;
  isActive: boolean;
  permissions: string[];
  inherits: string[];
  assignableBy: string[];
  approvableBy: string[];
  archivedAt?: string | null;
  archiveReason?: string | null;
}

export interface AdminUserCommunicationRequest {
  userId: string;
  sendEmail: boolean;
  sendNotification: boolean;
  subjectOrTitle: string;
  message: string;
}

export interface AdminCommunicationResult {
  userId: string;
  emailSent: boolean;
  notificationSent: boolean;
}

export interface AdminUserActivitySummary {
  activeParticipations: number;
  eventsAttended: number;
  approvedTaskWorkLogs: number;
  badgesCount: number;
  openRequests: number;
}

export interface AdminUserTimeBankSummary {
  balanceMinutes: number;
  availableMinutes: number;
  reservedMinutes: number;
  lifetimeEarnedMinutes: number;
  lifetimeSpentMinutes: number;
  lifetimeGiftedInMinutes: number;
  lifetimeGiftedOutMinutes: number;
  currentLevelCode?: string | null;
  lastTransactionAt?: string | null;
}

export interface AdminUserSummary {
  user: AdminUserListItem;
  activity: AdminUserActivitySummary;
  timeBank: AdminUserTimeBankSummary;
  recentRequests: AdminQueueItem[];
}

export interface AdminTimeBankOverview {
  walletsCount: number;
  transactionsCount: number;
  earnTransactionsCount: number;
  spendTransactionsCount: number;
  totalBalanceMinutes: number;
  totalAvailableMinutes: number;
  totalReservedMinutes: number;
  totalLifetimeEarnedMinutes: number;
  totalLifetimeSpentMinutes: number;
  totalGiftedInMinutes: number;
  totalGiftedOutMinutes: number;
  spendToEarnRatio: number;
  reservedSharePercent: number;
  topUsersByBalance: AdminTimeBankTopUser[];
}

export interface AdminTimeBankTopUser {
  userId: string;
  displayName: string;
  email: string;
  avatarUrl?: string | null;
  balanceMinutes: number;
  availableMinutes: number;
  reservedMinutes: number;
  currentLevelCode?: string | null;
}

export interface MonthlyGrowthPoint {
  year: number;
  month: number;
  users: number;
  organizations: number;
  projects: number;
  events: number;
  tasks: number;
}

export interface CategoryPopularityPoint {
  categoryId: string;
  count: number;
}

export interface AdminPlatformStatistics {
  usersTotal: number;
  activeUsers: number;
  organizationsTotal: number;
  projectsTotal: number;
  eventsTotal: number;
  tasksTotal: number;
  totalTimeBankIssuedMinutes: number;
  totalTimeBankSpentMinutes: number;
  totalTimeBankReservedMinutes: number;
  openReports: number;
  openModerationCases: number;
  monthlyGrowth: MonthlyGrowthPoint[];
  popularCategories: CategoryPopularityPoint[];
}

export interface RetentionStatistics {
  firstTimeVolunteers: number;
  returningVolunteers: number;
  retentionPercent: number;
}

export interface ConversionFunnelStatistics {
  recommendationsShown: number;
  invitationsSent: number;
  invitationsAccepted: number;
  attendanceOrCompletions: number;
  inviteToAcceptPercent: number;
  acceptToCompletionPercent: number;
}

export interface ReliabilityStatistics {
  approvedAttendances: number;
  rejectedAttendances: number;
  approvedWorkLogs: number;
  rejectedWorkLogs: number;
  completedTasks: number;
  lateTasks: number;
  score: number;
}

export interface TimeBankVelocityStatistics {
  earnedThisWeekMinutes: number;
  spentThisWeekMinutes: number;
  reservedMinutes: number;
  stuckReservedMinutes: number;
  adminAdjustmentMinutesThisWeek: number;
  spendToEarnRatio: number;
}

export interface QueueSlaStatistics {
  pendingTotal: number;
  olderThan24h: number;
  olderThan48h: number;
  olderThan72h: number;
  averageAgeHours: number;
  maxAgeHours: number;
}

export interface CategoryHeatmapItem {
  categoryId: string;
  categoryName: string | null;
  eventsCount: number;
  tasksCount: number;
  approvedAttendanceCount: number;
  confirmedMinutes: number;
  completionRate: number;
}

export interface AdvancedStatisticsDashboard {
  retention: RetentionStatistics;
  conversionFunnel: ConversionFunnelStatistics;
  reliability: ReliabilityStatistics;
  timeBankVelocity: TimeBankVelocityStatistics;
  requestSla: QueueSlaStatistics;
  reportSla: QueueSlaStatistics;
  categoryHeatmap: CategoryHeatmapItem[];
}

export interface AdminQueueSummary {
  totalOpen: number;
  newCount: number;
  inProgressCount: number;
  averageAgeHours: number;
  maxAgeHours: number;
}

export interface AdminQueueItem {
  requestId: string;
  userId: string;
  userDisplayName: string;
  userAvatarUrl?: string | null;
  type: string;
  status: string;
  title: string;
  description: string;
  targetEntityType?: string | null;
  targetEntityId?: string | null;
  createdAt: string;
  updatedAt: string;
  ageHours: number;
}

export interface AdminQueueResponse {
  summary: AdminQueueSummary;
  page: AdminPagedResult<AdminQueueItem>;
}

export interface AdminSystemCounts {
  users: number;
  organizations: number;
  projects: number;
  events: number;
  tasks: number;
  openRequests: number;
  openReports: number;
  pendingAttendanceApprovals: number;
  pendingTaskWorkLogs: number;
  overdueTasks: number;
}

export interface AdminSystemRisk {
  code: string;
  severity: "info" | "warning" | "critical" | string;
  message: string;
  count: number;
}

export interface AdminSystemHealth {
  databaseAvailable: boolean;
  healthScore: number;
  status: string;
  checkedAt: string;
  counts: AdminSystemCounts;
  risks: AdminSystemRisk[];
}

export interface AdminPagedApiResponse<T> {
  data: T[];
  pagination: {
    totalCount: number;
    page: number;
    pageSize: number;
    totalPages?: number | null;
    nextPage?: number | null;
  };
}
