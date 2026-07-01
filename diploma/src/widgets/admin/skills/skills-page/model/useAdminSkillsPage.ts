import {
  skillQuery,
  type SkillListItemDto,
  type SkillsListParams,
} from "@entities/skill";
import { categoryQuery } from "@entities/category";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useDebounce } from "@shared/libs/hooks";
import { getAdminPageWindow } from "@widgets/admin/shared/lib/adminPagination";
import { useDeleteSkill } from "../../skill-delete-confirmation/model/useDeleteSkill";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

export type CategoryFilterValue = "all" | `category:${string}`;

export interface DeleteSkillTarget {
  skill: SkillListItemDto;
  totalVolunteers?: number;
  closeDrawer: boolean;
}

const getCategoryFilterValue = (categoryIds?: string[]): CategoryFilterValue =>
  categoryIds?.[0] ? `category:${categoryIds[0]}` : "all";

export const useAdminSkillsPage = () => {
  const { t } = useTranslation("admin");
  const navigate = useNavigate({ from: "/admin/skills/" });
  const search = useSearch({ from: "/_adminLayout/admin/skills/" });
  const [searchInput, setSearchInput] = useState(search.Search ?? "");
  const [selectedSkill, setSelectedSkill] = useState<SkillListItemDto | null>(
    null,
  );
  const [formState, setFormState] = useState<{
    mode: "create" | "edit";
    skill: SkillListItemDto | null;
  } | null>(null);
  const [iconSkill, setIconSkill] = useState<SkillListItemDto | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<DeleteSkillTarget | null>(
    null,
  );
  const debouncedSearch = useDebounce(searchInput, 300);
  const deleteMutation = useDeleteSkill(() => {
    if (deleteTarget?.closeDrawer) {
      setSelectedSkill(null);
    }

    setDeleteTarget(null);
  });

  const updateSearch = useCallback(
    (patch: Partial<typeof search>) => {
      navigate({
        search: (prev) => ({ ...prev, ...patch }),
        resetScroll: false,
      });
    },
    [navigate],
  );

  useEffect(() => {
    setSearchInput(search.Search ?? "");
  }, [search.Search]);

  useEffect(() => {
    const nextSearch = debouncedSearch.trim() || undefined;
    const currentSearch = search.Search || undefined;

    if (nextSearch !== currentSearch) {
      updateSearch({ Search: nextSearch, Page: 1 });
    }
  }, [debouncedSearch, search.Search, updateSearch]);

  const skillsParams = useMemo<SkillsListParams>(
    () => ({
      Search: search.Search || undefined,
      CategoryIds: search.CategoryIds?.length ? search.CategoryIds : undefined,
      OrderBy: search.OrderBy,
      Page: search.Page,
      PageSize: search.PageSize,
    }),
    [
      search.CategoryIds,
      search.OrderBy,
      search.Page,
      search.PageSize,
      search.Search,
    ],
  );

  const skillsQueryResult = useQuery(skillQuery.list(skillsParams));
  const categoriesQuery = useQuery(
    categoryQuery.list({ OrderBy: "NameAsc", Page: 1, PageSize: 100 }),
  );
  const skills = skillsQueryResult.data?.data ?? [];
  const pagination = skillsQueryResult.data?.pagination;
  const currentPage = pagination?.page || search.Page || 1;
  const totalPages = Math.max(pagination?.totalPages || 1, 1);
  const totalCount = pagination?.totalCount ?? 0;
  const pageWindow = getAdminPageWindow(currentPage, totalPages);
  const categoryOptions = useMemo(
    () => [
      {
        value: "all" as CategoryFilterValue,
        label: t("skills.allCategories"),
      },
      ...((categoriesQuery.data?.data ?? []).map((category) => ({
        value: `category:${category.id}` as CategoryFilterValue,
        label: category.name,
      })) ?? []),
    ],
    [categoriesQuery.data?.data, t],
  );
  const categoryFilterValue = getCategoryFilterValue(search.CategoryIds);

  const setCategoryFilter = (value: CategoryFilterValue) => {
    updateSearch({
      CategoryIds:
        value === "all" ? undefined : [value.replace(/^category:/, "")],
      Page: 1,
    });
  };

  return {
    search,
    searchInput,
    setSearchInput,
    updateSearch,
    skills,
    skillsQueryResult,
    pagination: {
      currentPage,
      totalPages,
      totalCount,
      pageWindow,
    },
    categoryOptions,
    categoryFilterValue,
    setCategoryFilter,
    selectedSkill,
    setSelectedSkill,
    formState,
    setFormState,
    iconSkill,
    setIconSkill,
    deleteTarget,
    setDeleteTarget,
    deleteMutation,
  };
};
