import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMapUserLocation } from "@features/map";
import { getMyOfferMainForms } from "../config/getMyOfferMainForms";
import { myOfferDetailDefaults, offerQuery } from "@entities/offer";
import type { MyOfferMode } from "../config/myOfferTab";

export const useMyOfferPage = () => {
  const { id } = useParams({ from: "/_masterLayout/offers/my/$id/" });
  const { tab, ...search } = useSearch({
    from: "/_masterLayout/offers/my/$id/",
  });

  const { data: offer } = useSuspenseQuery(offerQuery.myId(id));
  const { coordinates: userLocation } = useMapUserLocation();

  const navigate = useNavigate({ from: "/offers/my/$id/" });

  const handleTabChange = (tab: MyOfferMode) => {
    navigate({
      params: { id },
      search: myOfferDetailDefaults[tab],
      resetScroll: false,
    });
  };
  const forms = getMyOfferMainForms({
    offer,
    userLocation,
    search,
  });

  return {
    tab,
    offer,
    forms,
    handleTabChange,
  };
};
