import type { QueryKey } from "@tanstack/react-query";
import type { PaginationResponse } from "../pagination/PaginationResponse";

export interface QueryResult<T> {
  data: T[] | undefined;
  pagination?: PaginationResponse;

  isLoading?: boolean;
  isFetching?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  error?: unknown;

  fetchNextPage?: () => void;
  fetchPreviousPage?: () => void;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isFetchingNextPage?: boolean;
  isFetchingPreviousPage?: boolean;
  targetMessageId?: string | null;
  queryKey?: QueryKey;

  refetch?: () => void;
}
