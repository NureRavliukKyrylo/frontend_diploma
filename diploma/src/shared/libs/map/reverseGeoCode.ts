const BASE_URL = import.meta.env.VITE_BASE_GEO_URL;
const API_KEY = import.meta.env.VITE_API_GEO_KEY;

interface LocationInfo {
  address: {
    city?: string;
    country?: string;
  };
}
export const reverseGeocode = async (
  lat: number,
  lon: number,
): Promise<string> => {
  const res = await fetch(
    `${BASE_URL}/reverse?key=${API_KEY}&lat=${lat}&lon=${lon}&format=json`,
  );
  const data: LocationInfo = await res.json();
  const { city, country } = data.address;

  return [city, country].filter(Boolean).join(", ");
};
