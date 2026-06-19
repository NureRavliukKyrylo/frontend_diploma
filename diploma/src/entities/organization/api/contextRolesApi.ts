import { apiClient } from "@shared/api";
import {
  normalizeContextRoleResponse,
  normalizeContextRoles,
} from "../lib/normalizeContextRole";
import type {
  ContextRoleArchiveReason,
  ContextRoleCreateDto,
  ContextRoleDto,
} from "../model/types/contextRolesTypes";

export const getOrgContextRoles = async (
  organizationId: string,
  includeArchived = false,
): Promise<ContextRoleDto[]> => {
  const response = await apiClient.get<unknown>(
    `ContextRole/organization/${organizationId}`,
    {
      params: includeArchived ? { includeArchived: true } : undefined,
    },
  );

  return normalizeContextRoles(response.data);
};

export const getContextRoleTemplates = async (
  entityType: string,
): Promise<ContextRoleDto[]> => {
  const response = await apiClient.get<unknown>(
    "ContextRole/templates",
    {
      params: {
        entityType,
      },
    },
  );

  return normalizeContextRoles(response.data);
};

export const createContextRole = async (payload: ContextRoleCreateDto) => {
  const response = await apiClient.post<unknown>("ContextRole/create", payload);
  return normalizeContextRoleResponse(response.data);
};

export const updateContextRole = async (
  id: string,
  dto: ContextRoleCreateDto,
) => {
  const response = await apiClient.put<unknown>(`ContextRole/update/${id}`, dto);
  return normalizeContextRoleResponse(response.data);
};

export const archiveContextRole = async (
  id: string,
  reason: ContextRoleArchiveReason,
) => {
  const response = await apiClient.post<unknown>(`ContextRole/archive/${id}`, null, {
    params: { reason },
  });
  return normalizeContextRoleResponse(response.data);
};

export const restoreContextRole = async (id: string) => {
  const response = await apiClient.put<unknown>(`ContextRole/activate/${id}`);
  return normalizeContextRoleResponse(response.data);
};

export const deleteContextRole = async (id: string) => {
  const response = await apiClient.delete<unknown>(`ContextRole/delete/${id}`);
  return normalizeContextRoleResponse(response.data);
};

export const setDefaultContextRole = async (
  id: string,
  dto: ContextRoleCreateDto,
) => updateContextRole(id, { ...dto, isDefaultForJoin: true });

export const setDefaultRole = async (
  id: string,
  dto: ContextRoleCreateDto,
) => setDefaultContextRole(id, dto);
