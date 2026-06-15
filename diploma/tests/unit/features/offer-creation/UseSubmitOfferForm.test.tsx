import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useSubmitOfferForm } from "@features/time-bank/offer-form/main/model/useSubmitOfferForm";

const { createOfferMock, updateOfferMock, clearMock, setStepMock } = vi.hoisted(
  () => ({
    createOfferMock: vi.fn(),
    updateOfferMock: vi.fn(),
    clearMock: vi.fn(),
    setStepMock: vi.fn(),
  }),
);

const storeMock = {
  step: 0,
  data: {
    id: null,
    title: "Test",
    description: "Desc",
    priceMinutes: 30,
    startAt: null,
    endAt: null,
    isOnline: false,
    location: null,
    categories: [],
    skills: [],
  },
  clear: clearMock,
  setStep: setStepMock,
};

vi.mock("@entities/offer", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useOfferFormStore: (selector?: (s: any) => any) =>
      selector ? selector(storeMock) : storeMock,
    offerKeys: { all: () => ["offers"] },
  };
});

vi.mock("@features/offer/api/submitOfferApi", () => ({
  createOffer: createOfferMock,
  updateOffer: updateOfferMock,
}));

vi.mock("@shared/api", () => ({
  queryClient: {
    prefetchInfiniteQuery: vi.fn(),
    invalidateQueries: vi.fn(),
  },
}));

vi.mock("@entities/skill", () => ({
  skillsQuery: { infinite: vi.fn(() => ({ queryKey: ["skills"] })) },
}));

vi.mock("@entities/category", () => ({
  categoryQuery: { infinite: vi.fn(() => ({ queryKey: ["categories"] })) },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useSubmitOfferForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    storeMock.step = 0;
    storeMock.data.isOnline = false;
  });

  it("isPending is false initially", () => {
    const { result } = renderHook(() => useSubmitOfferForm(), {
      wrapper: createWrapper(),
    });
    expect(result.current.isPending).toBe(false);
  });

  it("calls createOffer on submit when not editing", async () => {
    createOfferMock.mockResolvedValue({});
    const onSuccess = vi.fn();

    const { result } = renderHook(
      () => useSubmitOfferForm({ isEdit: false, onSuccess }),
      { wrapper: createWrapper() },
    );

    await act(async () => {
      result.current.submit();
    });

    await waitFor(() => {
      expect(createOfferMock).toHaveBeenCalled();
    });
  });

  it("calls updateOffer on submit when editing", async () => {
    updateOfferMock.mockResolvedValue({});
    const onSuccess = vi.fn();

    const { result } = renderHook(
      () => useSubmitOfferForm({ isEdit: true, onSuccess }),
      { wrapper: createWrapper() },
    );

    await act(async () => {
      result.current.submit();
    });

    await waitFor(() => {
      expect(updateOfferMock).toHaveBeenCalled();
    });
  });

  it("calls clear and onSuccess after successful submit", async () => {
    createOfferMock.mockResolvedValue({});
    const onSuccess = vi.fn();

    const { result } = renderHook(() => useSubmitOfferForm({ onSuccess }), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.submit();
    });

    await waitFor(() => {
      expect(clearMock).toHaveBeenCalled();
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  it("nextStep increments step normally", () => {
    storeMock.step = 0;
    storeMock.data.isOnline = false;

    const getStateSpy = vi.spyOn(
      require("@entities/offer"),
      "useOfferFormStore",
    );
    getStateSpy.mockReturnValue(storeMock);

    const { result } = renderHook(() => useSubmitOfferForm(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.nextStep();
    });

    expect(setStepMock).toHaveBeenCalledWith(1);
  });

  it("nextStep skips location step when isOnline is true", () => {
    storeMock.step = 0;
    storeMock.data.isOnline = true;

    const { result } = renderHook(() => useSubmitOfferForm(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.nextStep();
    });

    expect(setStepMock).toHaveBeenCalledWith(2);
  });

  it("prevStep decrements step normally", () => {
    storeMock.step = 2;
    storeMock.data.isOnline = false;

    const { result } = renderHook(() => useSubmitOfferForm(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.prevStep();
    });

    expect(setStepMock).toHaveBeenCalledWith(1);
  });

  it("prevStep skips location step going back when isOnline is true", () => {
    storeMock.step = 2;
    storeMock.data.isOnline = true;

    const { result } = renderHook(() => useSubmitOfferForm(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.prevStep();
    });

    expect(setStepMock).toHaveBeenCalledWith(0);
  });

  it("stepLabels excludes Location when isOnline", () => {
    storeMock.data.isOnline = true;

    const { result } = renderHook(() => useSubmitOfferForm(), {
      wrapper: createWrapper(),
    });

    expect(result.current.stepLabels).not.toContain("Location");
    expect(result.current.stepLabels).toEqual([
      "Overview",
      "Categories",
      "Skills",
    ]);
  });

  it("stepLabels includes Location when not online", () => {
    storeMock.data.isOnline = false;

    const { result } = renderHook(() => useSubmitOfferForm(), {
      wrapper: createWrapper(),
    });

    expect(result.current.stepLabels).toEqual([
      "Overview",
      "Location",
      "Categories",
      "Skills",
    ]);
  });
});
