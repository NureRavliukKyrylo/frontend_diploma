import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { IconPlus } from "@tabler/icons-react";
import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  getRememberedOwnedOrganizationIds,
  organizationKeys,
  organizationQuery,
  rememberOwnedOrganizationIds,
  type Organization,
  type OrganizationSearchParams,
} from "@entities/organization";
import { profileQuery, useUserStore } from "@entities/user/profile";
import { Pagination } from "@shared/ui";
import { LinkButtonWrapper } from "@shared/ui/buttons";
import {
  MyOrganizationsListWidget,
  OrganizationsHeroWidget,
} from "@widgets/organizations";
import styles from "./OrganizationsPage.module.scss";
import { useTranslation } from "react-i18next";

const OWNED_ORGANIZATIONS_FETCH_LIMIT = 200;
const FAB_FOOTER_GAP = 24;
const ARCHIVED_ORGANIZATIONS_COUNT_PARAMS: OrganizationSearchParams = {
  Page: 1,
  PageSize: 1,
  pageSize: 1,
  IncludeArchived: true,
};

const getOrganizationId = (organization: Organization): string =>
  organization.organizationId ?? organization.id;

export const OrganizationsPage = () => {
  const { t } = useTranslation("organizations");
  const queryClient = useQueryClient();
  const navigate = useNavigate({ from: "/organizations/my/" });
  const search = useSearch({ from: "/_masterLayout/organizations/my/" });
  const currentSearchPage = search.Page ?? 1;
  const pageSize = search.pageSize ?? 12;
  const [fabLift, setFabLift] = useState(0);
  const storedUserId = useUserStore((state) => state.userId)?.trim();
  const { data: user } = useQuery(profileQuery.all());
  const currentUserId = storedUserId || user?.id?.trim();
  const { data: memberships = [] } = useQuery(organizationQuery.memberships());
  const {
    data: ownedOrganizationsResponse,
    isSuccess: isOwnedOrganizationsSuccess,
  } = useQuery(
    organizationQuery.my({
      ...search,
      Page: 1,
      pageSize: OWNED_ORGANIZATIONS_FETCH_LIMIT,
    }),
  );
  const { data: archivedOrganizationsResponse } = useQuery(
    organizationQuery.archived(ARCHIVED_ORGANIZATIONS_COUNT_PARAMS),
  );
  const archivedCount =
    archivedOrganizationsResponse?.pagination.totalCount ??
    archivedOrganizationsResponse?.data.length ??
    0;

  const serverOwnedOrganizations = useMemo(
    () =>
      (ownedOrganizationsResponse?.data ?? []).filter((organization) =>
        Boolean(
          currentUserId && organization.ownerId?.trim() === currentUserId,
        ),
      ),
    [currentUserId, ownedOrganizationsResponse?.data],
  );
  const serverOwnedOrganizationIds = useMemo(
    () => serverOwnedOrganizations.map((organization) => organization.id),
    [serverOwnedOrganizations],
  );
  const cachedOwnedOrganizations = useMemo(
    () =>
      queryClient
        .getQueriesData<Organization>({
          queryKey: [...organizationKeys.all(), "details"],
        })
        .map(([, organization]) => organization)
        .filter((organization): organization is Organization =>
          Boolean(
            organization &&
            currentUserId &&
            organization.ownerId?.trim() === currentUserId,
          ),
        ),
    [currentUserId, queryClient],
  );
  const rememberedOwnedOrganizationIds = useMemo(
    () => getRememberedOwnedOrganizationIds(currentUserId),
    [currentUserId],
  );
  const ownedOrganizationIds = useMemo(
    () =>
      Array.from(
        new Set([
          ...serverOwnedOrganizationIds,
          ...cachedOwnedOrganizations.map((organization) => organization.id),
        ]),
      ),
    [cachedOwnedOrganizations, serverOwnedOrganizationIds],
  );
  const profileOrganizations = user?.profile?.organizations ?? [];
  const membershipOrganizationIds = useMemo(
    () =>
      memberships
        .filter((membership) => membership.isActive)
        .map((membership) => membership.entityId),
    [memberships],
  );
  const profileOrganizationIds = useMemo(
    () => profileOrganizations.map(getOrganizationId).filter(Boolean),
    [profileOrganizations],
  );
  const relationshipOrganizationIds = useMemo(
    () =>
      new Set([
        ...ownedOrganizationIds,
        ...membershipOrganizationIds,
        ...profileOrganizationIds,
      ]),
    [membershipOrganizationIds, ownedOrganizationIds, profileOrganizationIds],
  );
  const detailOrganizationIds = useMemo(() => {
    return Array.from(
      new Set([
        ...ownedOrganizationIds,
        ...membershipOrganizationIds,
        ...profileOrganizationIds,
        ...rememberedOwnedOrganizationIds,
      ]),
    );
  }, [
    membershipOrganizationIds,
    ownedOrganizationIds,
    profileOrganizationIds,
    rememberedOwnedOrganizationIds,
  ]);
  const detailOrganizationQueries = useQueries({
    queries: detailOrganizationIds.map((organizationId) => ({
      ...organizationQuery.byId(organizationId),
      enabled: Boolean(organizationId),
    })),
  });

  const allOrganizations = useMemo<Organization[]>(() => {
    const profileFallbacks = profileOrganizations.flatMap((organization) => {
      const id = getOrganizationId(organization);

      return id
        ? [
            {
              ...organization,
              id,
            },
          ]
        : [];
    });
    const detailedOrganizations = detailOrganizationQueries
      .map((query) => query.data)
      .filter((organization): organization is Organization => {
        if (!organization) return false;

        return (
          relationshipOrganizationIds.has(organization.id) ||
          Boolean(
            currentUserId && organization.ownerId?.trim() === currentUserId,
          )
        );
      });

    return Array.from(
      new Map(
        [
          ...profileFallbacks,
          ...serverOwnedOrganizations,
          ...cachedOwnedOrganizations,
          ...detailedOrganizations,
        ].map((organization) => [organization.id, organization]),
      ).values(),
    );
  }, [
    cachedOwnedOrganizations,
    currentUserId,
    detailOrganizationQueries,
    profileOrganizations,
    relationshipOrganizationIds,
    serverOwnedOrganizations,
  ]);

  useEffect(() => {
    if (!isOwnedOrganizationsSuccess) return;
    rememberOwnedOrganizationIds(currentUserId, ownedOrganizationIds);
  }, [currentUserId, isOwnedOrganizationsSuccess, ownedOrganizationIds]);

  const filteredOrganizations = useMemo(() => {
    const searchTerm = search.Search?.trim().toLowerCase();

    return searchTerm
      ? allOrganizations.filter((organization) =>
          organization.name.toLowerCase().includes(searchTerm),
        )
      : allOrganizations;
  }, [allOrganizations, search.Search]);

  const totalFilteredCount = filteredOrganizations.length;
  const totalPages =
    totalFilteredCount > 0 ? Math.ceil(totalFilteredCount / pageSize) : 0;
  const currentPage =
    totalPages > 0 ? Math.min(currentSearchPage, totalPages) : 1;

  const organizations = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredOrganizations.slice(startIndex, startIndex + pageSize);
  }, [currentPage, filteredOrganizations, pageSize]);

  useEffect(() => {
    let frameId = 0;
    let lastLift = -1;

    const measureFabLift = () => {
      frameId = 0;

      const footer = document.querySelector<HTMLElement>("[data-site-footer]");

      if (!footer) {
        lastLift = 0;
        setFabLift(0);
        return;
      }

      const overlap = window.innerHeight - footer.getBoundingClientRect().top;
      const nextLift = overlap > 0 ? overlap + FAB_FOOTER_GAP : 0;

      if (nextLift === lastLift) return;

      lastLift = nextLift;
      setFabLift(nextLift);
    };

    const scheduleFabLiftMeasure = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(measureFabLift);
    };

    measureFabLift();
    window.addEventListener("scroll", scheduleFabLiftMeasure, {
      passive: true,
    });
    window.addEventListener("resize", scheduleFabLiftMeasure);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", scheduleFabLiftMeasure);
      window.removeEventListener("resize", scheduleFabLiftMeasure);
    };
  }, []);

  const fabStyle = {
    "--fab-lift": `${fabLift}px`,
  } as CSSProperties;

  return (
    <div className={styles.page}>
      <OrganizationsHeroWidget archivedCount={archivedCount} />

      <MyOrganizationsListWidget
        organizations={organizations}
        showDiscoverCard
      />

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <Pagination
            total={totalPages}
            page={currentPage}
            onChange={(page) =>
              navigate({
                search: (prev) => ({ ...prev, Page: page }),
                resetScroll: false,
              })
            }
          />
        </div>
      )}

      <LinkButtonWrapper
        to="/organizations/create"
        className={styles.fab}
        aria-label={t("page.create")}
        style={fabStyle}
      >
        <IconPlus size="1em" stroke={2.4} />
      </LinkButtonWrapper>
    </div>
  );
};
