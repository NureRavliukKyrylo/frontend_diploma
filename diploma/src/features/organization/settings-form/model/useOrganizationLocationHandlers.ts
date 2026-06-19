import type { Dispatch, SetStateAction } from "react";
import type { Coordinates } from "@shared/config/types";
import { reverseGeocode } from "@shared/libs/map";
import type { OrganizationSettingsValues } from "./types";

interface UseOrganizationLocationHandlersProps {
  setValues: Dispatch<SetStateAction<OrganizationSettingsValues | null>>;
}

export const useOrganizationLocationHandlers = ({
  setValues,
}: UseOrganizationLocationHandlersProps) => {
  const handleLocationTextChange = (value: string) => {
    setValues((current) =>
      current ? { ...current, locationLabel: value } : current,
    );
  };

  const handleLocationChange = async (
    coordinates: Coordinates,
    label?: string,
  ) => {
    const fallbackLabel = `${coordinates.latitude.toFixed(
      4,
    )}, ${coordinates.longitude.toFixed(4)}`;

    setValues((current) =>
      current
        ? {
            ...current,
            location: coordinates,
            locationLabel: label || fallbackLabel,
          }
        : current,
    );

    if (label) return;

    try {
      const resolvedLabel = await reverseGeocode(
        coordinates.latitude,
        coordinates.longitude,
      );
      setValues((current) =>
        current
          ? {
              ...current,
              locationLabel: resolvedLabel || fallbackLabel,
            }
          : current,
      );
    } catch {
      setValues((current) =>
        current ? { ...current, locationLabel: fallbackLabel } : current,
      );
    }
  };

  return { handleLocationTextChange, handleLocationChange };
};
