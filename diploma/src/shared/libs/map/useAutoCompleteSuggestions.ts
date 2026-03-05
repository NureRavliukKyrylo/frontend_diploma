import type { LocationSuggestion } from "@shared/config/types";
import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_GEO_URL;
const API_KEY = import.meta.env.VITE_API_GEO_KEY;

export function useAutocompleteSuggestions(inputString: string) {
  const debouncedInput = useDebounce(inputString, 400);
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!debouncedInput.trim()) {
      setSuggestions([]);
      setError(null);
      return;
    }

    axios
      .get(`${BASE_URL}/autocomplete`, {
        params: {
          key: API_KEY,
          q: debouncedInput,
          limit: 10,
          normalizecity: 1,
        },
      })
      .then(({ data }) => {
        setError(null);
        setSuggestions(
          data.map((item: any) => ({
            displayName: item.display_name,
            lat: parseFloat(item.lat),
            lng: parseFloat(item.lon),
          })),
        );
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          setError("No results were found");
        } else {
          setError(err.response?.data?.message ?? "Failed to fetch locations");
        }
        setSuggestions([]);
      });
  }, [debouncedInput]);

  return {
    suggestions,
    error,
    reset: () => setSuggestions([]),
  };
}
