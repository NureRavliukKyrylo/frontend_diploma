import { infiniteQueryOptions } from "@tanstack/react-query";
import { getMembers } from "../get-members/getMembersApi";
import type { GetMembersParams } from "../get-members/getMembersApi";

export const participationKeys = {
  all: () => ["participation"] as const,
  members: (entityType: string, entityId: string) =>
    [...participationKeys.all(), "members", entityType, entityId] as const,
  membersInfinite: (entityType: string, entityId: string) =>
    [...participationKeys.members(entityType, entityId), "infinite"] as const,
};

export const participationQuery = {
  membersInfinite: (params: Omit<GetMembersParams, "page">) =>
    infiniteQueryOptions({
      queryKey: participationKeys.membersInfinite(
        params.entityType,
        params.entityId,
      ),
      queryFn: ({ pageParam }) => getMembers({ ...params, page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.pagination.nextPage ?? undefined,
      select: (data) => data.pages.flatMap((page) => page.data),
    }),
};
