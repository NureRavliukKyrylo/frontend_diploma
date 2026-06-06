// src/shared/libs/signalr/signalRStore.ts
import { create } from "zustand";
import * as signalR from "@microsoft/signalr";
import { API_URL } from "../constants";

export type HubName = "notifications" | "chats";
type SignalRStatus = "disconnected" | "connecting" | "connected" | "failed";

interface HubState {
  connection: signalR.HubConnection | null;
  status: SignalRStatus;
}

interface SignalRStore {
  hubs: Record<HubName, HubState>;
  connect: (hub: HubName) => Promise<void>;
  disconnect: (hub: HubName) => Promise<void>;
  disconnectAll: () => Promise<void>;
}

const defaultHubState = (): HubState => ({
  connection: null,
  status: "disconnected",
});

export const useSignalRStore = create<SignalRStore>((set, get) => ({
  hubs: {
    notifications: defaultHubState(),
    chats: defaultHubState(),
  },

  connect: async (hub) => {
    console.log(`[SignalR] Connecting to: ${API_URL}/hubs/${hub}`);
    const current = get().hubs[hub];
    if (current.status === "connected" || current.status === "connecting")
      return;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:7111/hubs/${hub}`, {
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Warning)
      .build();

    set((s) => ({
      hubs: { ...s.hubs, [hub]: { connection, status: "connecting" } },
    }));

    try {
      await connection.start();
      set((s) => ({
        hubs: { ...s.hubs, [hub]: { connection, status: "connected" } },
      }));
    } catch (err) {
      console.error(`[SignalR] Failed to connect to ${hub}:`, err);
      set((s) => ({
        hubs: { ...s.hubs, [hub]: { connection: null, status: "failed" } },
      }));
    }
  },

  disconnect: async (hub) => {
    const { connection } = get().hubs[hub];
    if (connection) {
      await connection.stop();
      set((s) => ({
        hubs: { ...s.hubs, [hub]: defaultHubState() },
      }));
    }
  },

  disconnectAll: async () => {
    const { hubs } = get();
    await Promise.all(
      (Object.keys(hubs) as HubName[]).map((hub) => get().disconnect(hub)),
    );
  },
}));
