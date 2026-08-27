import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useEditMessage } from "@features/chat/edit-message/model/useEditMessage";
import { queryClient } from "@shared/api";

const { addToastMock } = vi.hoisted(() => ({ addToastMock: vi.fn() }));
const { editMessageMock } = vi.hoisted(() => ({ editMessageMock: vi.fn() }));

vi.mock("@features/chat/edit-message/api/editMessageApi", () => ({
  editMessage: editMessageMock,
}));

vi.mock("@heroui/react", async (importOriginal) => {
  const actual = await importOriginal();
  return { ...(actual as object), addToast: addToastMock };
});

vi.mock("@entities/chat", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    messageKeys: { list: (chatId: string) => ["messages", chatId] },
  };
});

vi.mock("@shared/libs/error-message", () => ({
  getErrorMessage: (e: unknown) =>
    e instanceof Error ? e.message : "Something went wrong",
}));

const createWrapper = () => {
  queryClient.setDefaultOptions({
    queries: { retry: false, gcTime: 0 },
    mutations: { retry: false },
  });
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useEditMessage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    queryClient.clear();
    vi.spyOn(queryClient, "invalidateQueries");
  });

  it("isLoading is false initially", () => {
    const { result } = renderHook(() => useEditMessage("chat-1", "msg-1"), {
      wrapper: createWrapper(),
    });
    expect(result.current.isLoading).toBe(false);
  });

  it("calls editMessage api with correct data", async () => {
    editMessageMock.mockResolvedValue({});
    const { result } = renderHook(() => useEditMessage("chat-1", "msg-1"), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.editMessage({ newContent: "Updated text" });
    });

    await waitFor(() => {
      expect(editMessageMock).toHaveBeenCalledWith("chat-1", "msg-1", {
        newContent: "Updated text",
      });
    });
  });

  it("calls onSuccess callback on success", async () => {
    editMessageMock.mockResolvedValue({});
    const onSuccess = vi.fn();
    const { result } = renderHook(
      () => useEditMessage("chat-1", "msg-1", onSuccess),
      { wrapper: createWrapper() },
    );

    await act(async () => {
      result.current.editMessage({ newContent: "Updated" });
    });

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  it("shows error toast on failure", async () => {
    editMessageMock.mockRejectedValue(new Error("Edit failed"));
    const { result } = renderHook(() => useEditMessage("chat-1", "msg-1"), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.editMessage({ newContent: "Updated" });
    });

    await waitFor(() => {
      expect(addToastMock).toHaveBeenCalledWith(
        expect.objectContaining({ color: "danger" }),
      );
    });
  });

  it("does not call onSuccess on failure", async () => {
    editMessageMock.mockRejectedValue(new Error("Edit failed"));
    const onSuccess = vi.fn();
    const { result } = renderHook(
      () => useEditMessage("chat-1", "msg-1", onSuccess),
      { wrapper: createWrapper() },
    );

    await act(async () => {
      result.current.editMessage({ newContent: "Updated" });
    });

    await waitFor(() => {
      expect(addToastMock).toHaveBeenCalled();
    });

    expect(onSuccess).not.toHaveBeenCalled();
  });
});
