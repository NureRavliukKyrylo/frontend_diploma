import type { Dispatch, SetStateAction } from "react";
import type { Coordinates } from "@shared/config/types";
import { reverseGeocode } from "@shared/libs/map";
import type { TaskSettingsLocation, TaskSettingsValues } from "./types";

interface UseTaskEditLocationHandlersProps {
  setValues: Dispatch<SetStateAction<TaskSettingsValues>>;
}

export const useTaskEditLocationHandlers = ({
  setValues,
}: UseTaskEditLocationHandlersProps) => {
  const handleLocationTextChange = (value: string) => {
    setValues((current) => ({ ...current, locationLabel: value }));
  };

  const handleLocationClear = () => {
    setValues((current) => ({
      ...current,
      location: null,
      locationLabel: "",
    }));
  };

  const handleLocationChange = async (
    coordinates: Coordinates,
    label?: string,
  ) => {
    const fallbackLabel = `${coordinates.latitude.toFixed(
      4,
    )}, ${coordinates.longitude.toFixed(4)}`;
    const nextLocation: TaskSettingsLocation = {
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      regionLabel: label || fallbackLabel,
    };

    setValues((current) => ({
      ...current,
      location: nextLocation,
      locationLabel: label || fallbackLabel,
    }));

    if (label) return;

    try {
      const resolvedLabel = await reverseGeocode(
        coordinates.latitude,
        coordinates.longitude,
      );

      setValues((current) => ({
        ...current,
        location: {
          ...nextLocation,
          regionLabel: resolvedLabel || fallbackLabel,
        },
        locationLabel: resolvedLabel || fallbackLabel,
      }));
    } catch {
      setValues((current) => ({
        ...current,
        location: nextLocation,
        locationLabel: fallbackLabel,
      }));
    }
  };

  return {
    handleLocationTextChange,
    handleLocationClear,
    handleLocationChange,
  };
};
