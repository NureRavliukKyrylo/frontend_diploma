import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useSendMessage } from "@features/chat/send-message/model/useSendMessage";

const { addToastMock, requestScrollToBottomMock } = vi.hoisted(() => ({
  addToastMock: vi.fn(),
  requestScrollToBottomMock: vi.fn(),
}));

const { sendMessageMock } = vi.hoisted(() => ({
  sendMessageMock: vi.fn(),
}));

vi.mock("@features/chat/send-message/api/sendMessageApi", () => ({
  sendMessage: sendMessageMock,
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
    useChatScrollStore: Object.assign(vi.fn(), {
      getState: () => ({ requestScrollToBottom: requestScrollToBottomMock }),
    }),
  };
});

vi.mock("@shared/api", () => ({
  queryClient: { invalidateQueries: vi.fn() },
}));

vi.mock("@shared/libs/error-message", () => ({
  getErrorMessage: (e: unknown) =>
    e instanceof Error ? e.message : "Something went wrong",
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useSendMessage", () => {
  beforeEach(() => vi.clearAllMocks());

  it("isLoading is false initially", () => {
    const { result } = renderHook(() => useSendMessage("chat-1"), {
      wrapper: createWrapper(),
    });
    expect(result.current.isLoading).toBe(false);
  });

  it("calls sendMessage api with correct data", async () => {
    sendMessageMock.mockResolvedValue({});
    const { result } = renderHook(() => useSendMessage("chat-1"), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.sendMessage({
        message: "Hello",
        replyToMessageId: "",
        mentionedUserIds: [],
      });
    });

    await waitFor(() => {
      expect(sendMessageMock).toHaveBeenCalledWith("chat-1", {
        message: "Hello",
        replyToMessageId: "",
        mentionedUserIds: [],
      });
    });
  });

  it("calls requestScrollToBottom on success", async () => {
    sendMessageMock.mockResolvedValue({});
    const { result } = renderHook(() => useSendMessage("chat-1"), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.sendMessage({
        message: "Hi",
        replyToMessageId: "",
        mentionedUserIds: [],
      });
    });

    await waitFor(() => {
      expect(requestScrollToBottomMock).toHaveBeenCalledWith("chat-1");
    });
  });

  it("calls onSuccess callback on success", async () => {
    sendMessageMock.mockResolvedValue({});
    const onSuccess = vi.fn();
    const { result } = renderHook(() => useSendMessage("chat-1", onSuccess), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.sendMessage({
        message: "Hi",
        replyToMessageId: "",
        mentionedUserIds: [],
      });
    });

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  it("invalidates message queries on success", async () => {
    sendMessageMock.mockResolvedValue({});
    const { queryClient } = await import("@shared/api");
    const { result } = renderHook(() => useSendMessage("chat-1"), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.sendMessage({
        message: "Hi",
        replyToMessageId: "",
        mentionedUserIds: [],
      });
    });

    await waitFor(() => {
      expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
        queryKey: ["messages", "chat-1"],
      });
    });
  });

  it("shows error toast on failure", async () => {
    sendMessageMock.mockRejectedValue(new Error("Network error"));
    const { result } = renderHook(() => useSendMessage("chat-1"), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.sendMessage({
        message: "Hi",
        replyToMessageId: "",
        mentionedUserIds: [],
      });
    });

    await waitFor(() => {
      expect(addToastMock).toHaveBeenCalledWith(
        expect.objectContaining({ color: "danger" }),
      );
    });
  });

  it("does not call onSuccess on failure", async () => {
    sendMessageMock.mockRejectedValue(new Error("Network error"));
    const onSuccess = vi.fn();
    const { result } = renderHook(() => useSendMessage("chat-1", onSuccess), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.sendMessage({
        message: "Hi",
        replyToMessageId: "",
        mentionedUserIds: [],
      });
    });

    await waitFor(() => {
      expect(addToastMock).toHaveBeenCalled();
    });

    expect(onSuccess).not.toHaveBeenCalled();
  });
});
