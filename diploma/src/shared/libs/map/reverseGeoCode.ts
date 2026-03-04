const BASE_URL = import.meta.env.VITE_BASE_GEO_URL;
const API_KEY = import.meta.env.VITE_API_GEO_KEY;

interface Address {
  city?: string;
  town?: string;
  village?: string;
  hamlet?: string;
  state?: string;
  borough?: string;
  country?: string;
}

interface LocationInfo {
  address: Address;
}

const resolveCity = (address: Address): string | undefined =>
  address.city ?? address.town ?? address.village ?? address.hamlet;

const resolveRegion = (address: Address): string | undefined =>
  address.state ?? address.borough;

export const reverseGeocode = async (
  lat: number,
  lon: number,
): Promise<string> => {
  const res = await fetch(
    `${BASE_URL}/reverse?key=${API_KEY}&lat=${lat}&lon=${lon}&format=json`,
  );
  const data: LocationInfo = await res.json();

  const city = resolveCity(data.address);
  const region = resolveRegion(data.address);
  const country = data.address.country;

  return [region, city, country].filter(Boolean).join(", ");
};
