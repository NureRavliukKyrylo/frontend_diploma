import { apiClient } from "@shared/api";
import type { AvailabilitySlot } from "../../model";
import type { ApiResponse } from "@shared/api";

export const getAvailabilitySlots = async (): Promise<
  ApiResponse<AvailabilitySlot[]>
> => {
  const result = await apiClient.get("/calendar/time-slots");
  return result.data;
};
