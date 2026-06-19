import { useEffect, useState } from "react";

export const useOrganizationLogoState = (logoUrl?: string | null) => {
  const [currentLogoUrl, setCurrentLogoUrl] = useState<string | null>(null);
  const [logoObjectUrl, setLogoObjectUrl] = useState<string | null>(null);
  const [logoCropUrl, setLogoCropUrl] = useState<string | null>(null);

  useEffect(() => {
    setCurrentLogoUrl(logoUrl ?? null);
  }, [logoUrl]);

  useEffect(
    () => () => {
      if (logoObjectUrl) URL.revokeObjectURL(logoObjectUrl);
    },
    [logoObjectUrl],
  );

  useEffect(
    () => () => {
      if (logoCropUrl) URL.revokeObjectURL(logoCropUrl);
    },
    [logoCropUrl],
  );

  return {
    currentLogoUrl,
    logoObjectUrl,
    logoCropUrl,
    setCurrentLogoUrl,
    setLogoObjectUrl,
    setLogoCropUrl,
  };
};
