import { useSignalRStore, type HubName } from "@shared/config/stores";
import { useEffect } from "react";

export function useSignalREvent(
  hub: HubName,
  event: string,
  handler: (...args: any[]) => void,
) {
  const connection = useSignalRStore((s) => s.hubs[hub].connection);

  useEffect(() => {
    if (!connection) return;
    connection.on(event, handler);
    return () => connection.off(event, handler);
  }, [connection, event, handler]);
}
