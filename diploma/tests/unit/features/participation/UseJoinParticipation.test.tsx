import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useJoinParticipation } from "@features/participation/model/useJoinParticipation";

const { joinMock, addToastMock, invalidateMock } = vi.hoisted(() => ({
  joinMock: vi.fn(),
  addToastMock: vi.fn(),
  invalidateMock: vi.fn(),
}));

vi.mock("@features/participation/api/participationJoinApi", () => ({
  joinParticipation: joinMock,
}));

vi.mock("@heroui/react", () => ({ addToast: addToastMock }));

vi.mock("@shared/libs/error-message", () => ({
  getErrorMessage: (e: unknown) => (e as Error).message,
}));

vi.mock("@entities/user/profile", () => ({
  profileKeys: { all: () => ["profile"] },
}));

vi.mock("@features/participation/config/queryKeyMap", () => ({
  queryKeyMap: {
    event: { id: (id: string) => ["event", id], mys: () => ["event", "my"] },
    task: { id: (id: string) => ["task", id], mys: () => ["task", "my"] },
  },
}));

vi.mock("@shared/api/filters", () => ({
  filtersKeys: { infinite: (p: object) => ["filters", p] },
}));

vi.mock("@shared/libs/text", () => ({
  capitalize: (s: string) => s.charAt(0).toUpperCase() + s.slice(1),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  vi.spyOn(QueryClient.prototype, "invalidateQueries").mockImplementation(
    invalidateMock,
  );
  return {
    queryClient,
    wrapper: ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  };
};

describe("useJoinParticipation", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns handleJoin, isLoading, error", () => {
    const { wrapper } = createWrapper();
    const { result } = renderHook(
      () => useJoinParticipation({ entityType: "event", entityId: "e1" }),
      { wrapper },
    );
    expect(typeof result.current.handleJoin).toBe("function");
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("calls joinParticipation with correct args", async () => {
    joinMock.mockResolvedValue({});
    const { wrapper } = createWrapper();
    const { result } = renderHook(
      () => useJoinParticipation({ entityType: "event", entityId: "e1" }),
      { wrapper },
    );
    await act(async () => {
      result.current.handleJoin();
    });
    await waitFor(() =>
      expect(joinMock).toHaveBeenCalledWith({
        entityId: "e1",
        entityType: "event",
      }),
    );
  });

  it("shows success toast when no approval required", async () => {
    joinMock.mockResolvedValue({ requiresApproval: false });
    const { wrapper } = createWrapper();
    const { result } = renderHook(
      () => useJoinParticipation({ entityType: "event", entityId: "e1" }),
      { wrapper },
    );
    await act(async () => {
      result.current.handleJoin();
    });
    await waitFor(() =>
      expect(addToastMock).toHaveBeenCalledWith(
        expect.objectContaining({
          color: "success",
          title: "participation.joinSuccess",
          description: "participation.joinSuccessDescription",
        }),
      ),
    );
  });

  it("shows warning toast when approval required", async () => {
    joinMock.mockResolvedValue({
      requiresApproval: true,
      message: "Pending approval",
    });
    const { wrapper } = createWrapper();
    const { result } = renderHook(
      () => useJoinParticipation({ entityType: "event", entityId: "e1" }),
      { wrapper },
    );
    await act(async () => {
      result.current.handleJoin();
    });
    await waitFor(() =>
      expect(addToastMock).toHaveBeenCalledWith(
        expect.objectContaining({
          color: "warning",
          description: "Pending approval",
        }),
      ),
    );
  });

  it("invalidates all relevant query keys on success", async () => {
    joinMock.mockResolvedValue({ requiresApproval: false });
    const { wrapper } = createWrapper();
    const { result } = renderHook(
      () => useJoinParticipation({ entityType: "event", entityId: "e1" }),
      { wrapper },
    );
    await act(async () => {
      result.current.handleJoin();
    });
    await waitFor(() => expect(invalidateMock).toHaveBeenCalledTimes(4));
  });

  it("calls onSuccess callback on success", async () => {
    joinMock.mockResolvedValue({ requiresApproval: false });
    const onSuccess = vi.fn();
    const { wrapper } = createWrapper();
    const { result } = renderHook(
      () =>
        useJoinParticipation({
          entityType: "event",
          entityId: "e1",
          onSuccess,
        }),
      { wrapper },
    );
    await act(async () => {
      result.current.handleJoin();
    });
    await waitFor(() => expect(onSuccess).toHaveBeenCalled());
  });

  it("shows danger toast on error", async () => {
    joinMock.mockRejectedValue(new Error("Network error"));
    const { wrapper } = createWrapper();
    const { result } = renderHook(
      () => useJoinParticipation({ entityType: "event", entityId: "e1" }),
      { wrapper },
    );
    await act(async () => {
      result.current.handleJoin();
    });
    await waitFor(() =>
      expect(addToastMock).toHaveBeenCalledWith(
        expect.objectContaining({
          color: "danger",
          title: "participation.joinFailed",
          description: "Network error",
        }),
      ),
    );
  });

  it("exposes error message on failure", async () => {
    joinMock.mockRejectedValue(new Error("Network error"));
    const { wrapper } = createWrapper();
    const { result } = renderHook(
      () => useJoinParticipation({ entityType: "event", entityId: "e1" }),
      { wrapper },
    );
    await act(async () => {
      result.current.handleJoin();
    });
    await waitFor(() => expect(result.current.error).toBe("Network error"));
  });
});
