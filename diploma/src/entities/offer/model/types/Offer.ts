import type { Category } from "@entities/category";
import type { Skill } from "@entities/skill";
import type { Coordinates } from "@shared/config/types";

export interface Offer {
  owner: {
    id: string;
    firstName: string;
    lastName: string;
    userAvatar: string;
  };
  startAt: Date;
  endAt: Date;
  title: string;
  description: string;
  location?: Coordinates;
  locationInfo?: { address: string };
  isActive: boolean;
  isOnline: boolean;
  categories: Category[];
  skills: Skill[];
  priceMinutes: number;
}

export interface OfferJoined extends Offer {
  chatId: string;
}
