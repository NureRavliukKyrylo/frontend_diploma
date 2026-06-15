import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useLeaveParticipation } from "@features/participation/model/useLeaveParticipation";

const { leaveMock, addToastMock, invalidateMock } = vi.hoisted(() => ({
  leaveMock: vi.fn(),
  addToastMock: vi.fn(),
  invalidateMock: vi.fn(),
}));

vi.mock("@features/participation/api/participationLeaveApi", () => ({
  leaveParticipation: leaveMock,
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
  vi.spyOn(queryClient, "invalidateQueries").mockImplementation(invalidateMock);
  return {
    queryClient,
    wrapper: ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  };
};

describe("useLeaveParticipation", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns handleLeave, resetLeave, isLoading, error", () => {
    const { wrapper } = createWrapper();
    const { result } = renderHook(
      () => useLeaveParticipation({ entityType: "event", entityId: "e1" }),
      { wrapper },
    );
    expect(typeof result.current.handleLeave).toBe("function");
    expect(typeof result.current.resetLeave).toBe("function");
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("calls leaveParticipation with correct args", async () => {
    leaveMock.mockResolvedValue({});
    const { wrapper } = createWrapper();
    const { result } = renderHook(
      () => useLeaveParticipation({ entityType: "event", entityId: "e1" }),
      { wrapper },
    );
    await act(async () => {
      result.current.handleLeave();
    });
    await waitFor(() =>
      expect(leaveMock).toHaveBeenCalledWith({
        entityId: "e1",
        entityType: "event",
      }),
    );
  });

  it("shows success toast when no approval required", async () => {
    leaveMock.mockResolvedValue({ requiresApproval: false });
    const { wrapper } = createWrapper();
    const { result } = renderHook(
      () => useLeaveParticipation({ entityType: "event", entityId: "e1" }),
      { wrapper },
    );
    await act(async () => {
      result.current.handleLeave();
    });
    await waitFor(() =>
      expect(addToastMock).toHaveBeenCalledWith(
        expect.objectContaining({
          color: "success",
          title: "Left Event Successfully",
        }),
      ),
    );
  });

  it("shows warning toast when approval required", async () => {
    leaveMock.mockResolvedValue({
      requiresApproval: true,
      message: "Needs review",
    });
    const { wrapper } = createWrapper();
    const { result } = renderHook(
      () => useLeaveParticipation({ entityType: "event", entityId: "e1" }),
      { wrapper },
    );
    await act(async () => {
      result.current.handleLeave();
    });
    await waitFor(() =>
      expect(addToastMock).toHaveBeenCalledWith(
        expect.objectContaining({
          color: "warning",
          description: "Needs review",
        }),
      ),
    );
  });

  it("invalidates all relevant query keys on success", async () => {
    leaveMock.mockResolvedValue({});
    const { wrapper } = createWrapper();
    const { result } = renderHook(
      () => useLeaveParticipation({ entityType: "event", entityId: "e1" }),
      { wrapper },
    );
    await act(async () => {
      result.current.handleLeave();
    });
    await waitFor(() => expect(invalidateMock).toHaveBeenCalledTimes(4));
  });

  it("calls onSuccess callback on success", async () => {
    leaveMock.mockResolvedValue({});
    const onSuccess = vi.fn();
    const { wrapper } = createWrapper();
    const { result } = renderHook(
      () =>
        useLeaveParticipation({
          entityType: "event",
          entityId: "e1",
          onSuccess,
        }),
      { wrapper },
    );
    await act(async () => {
      result.current.handleLeave();
    });
    await waitFor(() => expect(onSuccess).toHaveBeenCalled());
  });

  it("shows danger toast on error", async () => {
    leaveMock.mockRejectedValue(new Error("Forbidden"));
    const { wrapper } = createWrapper();
    const { result } = renderHook(
      () => useLeaveParticipation({ entityType: "event", entityId: "e1" }),
      { wrapper },
    );
    await act(async () => {
      result.current.handleLeave();
    });
    await waitFor(() =>
      expect(addToastMock).toHaveBeenCalledWith(
        expect.objectContaining({ color: "danger" }),
      ),
    );
  });

  it("exposes error message on failure", async () => {
    leaveMock.mockRejectedValue(new Error("Forbidden"));
    const { wrapper } = createWrapper();
    const { result } = renderHook(
      () => useLeaveParticipation({ entityType: "event", entityId: "e1" }),
      { wrapper },
    );
    await act(async () => {
      result.current.handleLeave();
    });
    await waitFor(() => expect(result.current.error).toBe("Forbidden"));
  });
});
