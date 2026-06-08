import type { Coordinates } from "@shared/config/types";
import type {
  Offer,
  MyOfferSearch,
  BookingsOfferSearch,
} from "@entities/offer";
import type { MyOfferMode } from "./myOfferTab";
import { OverviewTab } from "../../overview-tab";
import { BookingsTab } from "../../bookings-tab";

interface MyOfferTabsProps {
  offer: Offer;
  userLocation?: Coordinates | null;
  search: Omit<MyOfferSearch, "tab">;
}

export const getMyOfferMainForms = (
  props: MyOfferTabsProps,
): Record<MyOfferMode, React.ReactNode> => ({
  overview: (
    <OverviewTab offer={props.offer} userLocation={props.userLocation} />
  ),
  bookings: (
    <BookingsTab
      offerId={props.offer.id}
      PageSize={(props.search as BookingsOfferSearch).PageSize}
    />
  ),
});
