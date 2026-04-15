import type { QueryResult } from "@shared/config/types";

export const mapQueryData =
  <TIn, TOut>(
    useQuery: () => QueryResult<TIn>,
    transform: (item: TIn) => TOut,
  ) =>
  (): QueryResult<TOut> => {
    const { data, ...rest } = useQuery();
    return { ...rest, data: data?.map(transform) };
  };
