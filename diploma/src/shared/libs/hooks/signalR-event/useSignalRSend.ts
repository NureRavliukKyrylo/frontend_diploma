import { useSignalRStore, type HubName } from "@shared/config/stores";
import { useCallback } from "react";

export function useSignalRSend(hub: HubName) {
  const connection = useSignalRStore((s) => s.hubs[hub].connection);

  const send = useCallback(
    (method: string, ...args: any[]) => {
      connection?.invoke(method, ...args);
    },
    [connection],
  );

  return send;
}
