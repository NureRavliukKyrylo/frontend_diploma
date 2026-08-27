import type { Dispatch, SetStateAction } from "react";
import type { Coordinates } from "@shared/config/types";
import { reverseGeocode } from "@shared/libs/map";
import type { ProjectSettingsLocation, ProjectSettingsValues } from "./types";

interface UseProjectLocationHandlersProps {
  setValues: Dispatch<SetStateAction<ProjectSettingsValues | null>>;
}

export const useProjectLocationHandlers = ({
  setValues,
}: UseProjectLocationHandlersProps) => {
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
    const nextLocation: ProjectSettingsLocation = {
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      regionLabel: label || fallbackLabel,
    };

    setValues((current) =>
      current
        ? {
            ...current,
            location: nextLocation,
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
              location: {
                ...nextLocation,
                regionLabel: resolvedLabel || fallbackLabel,
              },
              locationLabel: resolvedLabel || fallbackLabel,
            }
          : current,
      );
    } catch {
      setValues((current) =>
        current
          ? {
              ...current,
              location: nextLocation,
              locationLabel: fallbackLabel,
            }
          : current,
      );
    }
  };

  return { handleLocationTextChange, handleLocationChange };
};
