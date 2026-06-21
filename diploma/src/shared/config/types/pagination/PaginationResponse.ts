export interface PaginationResponse {
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  nextPage: number;
  previousPage: number;
  firstUnreadPage: number | null;
  firstUnreadMessageId: string | null;
}
