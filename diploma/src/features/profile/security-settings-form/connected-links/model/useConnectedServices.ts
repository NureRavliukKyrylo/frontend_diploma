import { useSuspenseQuery } from "@tanstack/react-query";
import {
  CONNECTED_SERVICES_CONFIG,
  profileQuery,
  type ConnectedServiceId,
} from "@entities/user/profile";

import { useGoogleCalendarService } from "./useGoogleCalendarService";
import type { ConnectedServiceHooks } from "../config/ServiceHooks";
import { useGoogleAccountService } from "./useGoogleAcountService";

export const useConnectedServices = () => {
  const { data: user } = useSuspenseQuery(profileQuery.all());

  const serviceHooks: Record<ConnectedServiceId, ConnectedServiceHooks> = {
    google: useGoogleAccountService(),
    googleCalendar: useGoogleCalendarService(),
  };

  const services = CONNECTED_SERVICES_CONFIG.map((config) => {
    const connected =
      user.connectedServices.find((s) => s.provider === config.id)?.connected ??
      false;

    const { link, unlink } = serviceHooks[config.id];

    return {
      ...config,
      connected,
      action: connected ? unlink.trigger : link.trigger,
      isPending: connected ? unlink.isLoading : link.isLoading,
    };
  });

  return { services };
};
