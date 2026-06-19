import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { participationQuery } from "../queries/participationQuery";
import type { GetMembersParams } from "../../api/get-members/getMembersApi";
import type { ParticipationMember } from "../types/ParticipationMember";
import type { QueryResult } from "@shared/config/types";

export const useMembersInfiniteQuery =
  (params: Omit<GetMembersParams, "page">) =>
  (): QueryResult<ParticipationMember> => {
    const {
      data = [],
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
    } = useSuspenseInfiniteQuery(participationQuery.membersInfinite(params));

    return { data, fetchNextPage, hasNextPage, isFetchingNextPage };
  };
