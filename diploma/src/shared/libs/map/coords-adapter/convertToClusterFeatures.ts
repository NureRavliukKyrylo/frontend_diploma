interface WithLocation {
  location?: {
    latitude?: number;
    longitude?: number;
  } | null;
}

export const convertToClusterFeatures = <T extends WithLocation>(items: T[]) =>
  items.flatMap((item) => {
    const lat = item.location?.latitude;
    const lng = item.location?.longitude;
    if (!lat || !lng) return [];

    return [
      {
        type: "Feature" as const,
        properties: { cluster: false, item },
        geometry: {
          type: "Point" as const,
          coordinates: [lng, lat],
        },
      },
    ];
  });
