import type { LocationSuggestion } from "@shared/config/types";
import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks";
import axios from "axios";
import { useLocaleStore } from "@shared/config/stores";

const BASE_URL = import.meta.env.VITE_BASE_GEO_URL;
const API_KEY = import.meta.env.VITE_API_GEO_KEY;

export function useAutocompleteSuggestions(inputString: string) {
  const debouncedInput = useDebounce(inputString, 400);
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [error, setError] = useState<string | null>(null);
  const locale = useLocaleStore((s) => s.locale);
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
          "accept-language": locale,
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
