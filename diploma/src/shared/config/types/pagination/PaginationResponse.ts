export interface PaginationResponse {
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  nextPage: number | null;
  previousPage: number | null;
  firstUnreadPage?: number | null;
  firstUnreadMessageId?: string | null;
}
