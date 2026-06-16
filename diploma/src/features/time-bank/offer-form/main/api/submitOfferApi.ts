import type { OfferFormData } from "@entities/offer";
import { apiClient } from "@shared/api";

export const createOffer = async (data: OfferFormData) => {
  const res = await apiClient.post("/time-bank/offers", buildPayload(data));
  return res.data;
};

export const updateOffer = async (offerId: string, data: OfferFormData) => {
  const res = await apiClient.put(
    `/time-bank/offers/${offerId}`,
    buildPayload(data),
  );
  return res.data;
};

const buildPayload = (data: OfferFormData) => ({
  title: data.title,
  description: data.description,
  priceMinutes: Number(data.priceMinutes),
  startAt: data.startAt,
  endAt: data.endAt,
  isOnline: data.isOnline,
  ...(!data.isOnline ? { location: data.location } : undefined),
  categoryIds: data.categories.map((category) => category.id),
  skillIds: data.skills.map((skill) => skill.id),
});
