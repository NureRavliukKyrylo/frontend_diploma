import type { Badge } from "./Badge";

export type BadgesQueryResult = {
  data: Badge[] | undefined;
  isLoading?: boolean;
};
