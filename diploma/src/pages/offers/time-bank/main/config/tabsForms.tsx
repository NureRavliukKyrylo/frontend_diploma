import type { TimeBankMode } from "./TimeBankMode";
import type { TimeBankSearch } from "../libs/timeBankSearchShema";
import { OffersTab } from "../../offers";
import { MyOffersTab } from "../../my-offers";
import { BookingsTab } from "../../bookings";

const tabsForms: Record<TimeBankMode, React.FC<{ search: any }>> = {
  offers: OffersTab,
  "my-offers": MyOffersTab,
  bookings: BookingsTab,
};

export const ActivitiesContent = ({
  tab,
  search,
}: {
  tab: TimeBankMode;
  search: TimeBankSearch;
}) => {
  const { tab: _, ...searchWithoutTab } = search as TimeBankSearch;

  const TabComponent = tabsForms[tab];
  return <TabComponent search={searchWithoutTab} />;
};
