import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useMessageForm } from "@features/chat/message-form/model/useMessageForm";

const { sendMessageMock, editMessageMock } = vi.hoisted(() => ({
  sendMessageMock: vi.fn(),
  editMessageMock: vi.fn(),
}));

vi.mock("@features/chat/send-message", () => ({
  useSendMessage: () => ({
    sendMessage: sendMessageMock,
    isLoading: false,
  }),
}));

vi.mock("@features/chat/edit-message", () => ({
  useEditMessage: () => ({
    editMessage: editMessageMock,
    isLoading: false,
  }),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useMessageForm", () => {
  beforeEach(() => vi.clearAllMocks());

  it("initializes with empty body when not editing", () => {
    const { result } = renderHook(() => useMessageForm({ chatId: "chat-1" }), {
      wrapper: createWrapper(),
    });
    expect(result.current.formik.values.body).toBe("");
  });

  it("initializes with editing message content when editing", () => {
    const { result } = renderHook(
      () =>
        useMessageForm({
          chatId: "chat-1",
          editingMessage: { id: "msg-1", content: "Original text" },
        }),
      { wrapper: createWrapper() },
    );
    expect(result.current.formik.values.body).toBe("Original text");
  });

  it("isLoading is false initially", () => {
    const { result } = renderHook(() => useMessageForm({ chatId: "chat-1" }), {
      wrapper: createWrapper(),
    });
    expect(result.current.isLoading).toBe(false);
  });

  it("calls sendMessage on submit when not editing", async () => {
    const { result } = renderHook(
      () => useMessageForm({ chatId: "chat-1", mentionedUserIds: ["u1"] }),
      { wrapper: createWrapper() },
    );

    await act(async () => {
      await result.current.formik.setFieldValue("body", "Hello world");
    });
    await act(async () => {
      await result.current.formik.submitForm();
    });

    await waitFor(() => {
      expect(sendMessageMock).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Hello world",
          mentionedUserIds: ["u1"],
        }),
      );
    });
  });

  it("calls editMessage on submit when editing", async () => {
    const { result } = renderHook(
      () =>
        useMessageForm({
          chatId: "chat-1",
          editingMessage: { id: "msg-1", content: "Original" },
        }),
      { wrapper: createWrapper() },
    );

    await act(async () => {
      await result.current.formik.setFieldValue("body", "Updated text");
    });
    await act(async () => {
      await result.current.formik.submitForm();
    });

    await waitFor(() => {
      expect(editMessageMock).toHaveBeenCalledWith({
        newContent: "Updated text",
      });
    });
  });

  it("does not call sendMessage when body is blank", async () => {
    const { result } = renderHook(() => useMessageForm({ chatId: "chat-1" }), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.formik.setFieldValue("body", "   ");
    });
    await act(async () => {
      await result.current.formik.submitForm();
    });

    expect(sendMessageMock).not.toHaveBeenCalled();
  });

  it("resets form after successful send", async () => {
    const { result } = renderHook(() => useMessageForm({ chatId: "chat-1" }), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.formik.setFieldValue("body", "Hello");
    });
    await act(async () => {
      await result.current.formik.submitForm();
    });

    await waitFor(() => {
      expect(result.current.formik.values.body).toBe("");
    });
  });

  it("does not submit when body is empty", async () => {
    const { result } = renderHook(() => useMessageForm({ chatId: "chat-1" }), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.formik.submitForm();
    });

    expect(sendMessageMock).not.toHaveBeenCalled();
  });

  it("passes replyToMessageId to sendMessage", async () => {
    const { result } = renderHook(
      () => useMessageForm({ chatId: "chat-1", replyToMessageId: "reply-123" }),
      { wrapper: createWrapper() },
    );

    await act(async () => {
      await result.current.formik.setFieldValue("body", "Replying");
    });
    await act(async () => {
      await result.current.formik.submitForm();
    });

    await waitFor(() => {
      expect(sendMessageMock).toHaveBeenCalledWith(
        expect.objectContaining({ replyToMessageId: "reply-123" }),
      );
    });
  });
});
