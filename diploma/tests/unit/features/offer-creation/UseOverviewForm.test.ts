import { useOverviewForm } from "@features/time-bank/offer-form/overview-step/model/useOverviewForm";
import { renderHook, act, waitFor } from "@testing-library/react";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const { setDataMock } = vi.hoisted(() => ({ setDataMock: vi.fn() }));

vi.mock("@entities/offer", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useOfferFormStore: (selector?: (s: any) => any) => {
      const state = { setData: setDataMock };
      return selector ? selector(state) : state;
    },
  };
});

const defaultData = {
  id: null,
  title: "Old title",
  description: "Old desc",
  priceMinutes: 10,
  startAt: null,
  endAt: null,
  isOnline: false,
  location: null,
  categories: [],
  skills: [],
};

describe("useOverviewForm", () => {
  beforeEach(() => vi.clearAllMocks());

  it("initializes formik with data values", () => {
    const { result } = renderHook(() => useOverviewForm({ data: defaultData }));
    expect(result.current.formik.values.title).toBe("Old title");
    expect(result.current.formik.values.description).toBe("Old desc");
    expect(result.current.formik.values.priceMinutes).toBe(10);
  });

  it("calls setData on valid submit", async () => {
    const tomorrow = new Date(Date.now() + 86400000).toISOString();
    const dayAfter = new Date(Date.now() + 172800000).toISOString();

    const data = {
      ...defaultData,
      title: "Valid title",
      description: "Valid description",
      priceMinutes: 30,
      startAt: tomorrow,
      endAt: dayAfter,
    };

    const { result } = renderHook(() => useOverviewForm({ data }));

    await act(async () => {
      await result.current.formik.submitForm();
    });

    await waitFor(() => {
      expect(setDataMock).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Valid title",
          description: "Valid description",
          priceMinutes: 30,
        }),
      );
    });
  });

  it("does not call setData when validation fails", async () => {
    const { result } = renderHook(() =>
      useOverviewForm({ data: { ...defaultData, title: "" } }),
    );

    await act(async () => {
      await result.current.formik.submitForm();
    });

    await waitFor(() => {
      expect(result.current.formik.errors.title).toBe(
        "timeBank:validation.titleRequired",
      );
    });

    expect(setDataMock).not.toHaveBeenCalled();
  });

  it("handleDateRangeChange updates startAt and endAt", async () => {
    const { result } = renderHook(() => useOverviewForm({ data: defaultData }));
    const start = new Date(Date.now() + 86400000).toISOString();
    const end = new Date(Date.now() + 172800000).toISOString();

    await act(async () => {
      result.current.handleDateRangeChange({ start, end });
    });

    expect(result.current.formik.values.startAt).toBe(start);
    expect(result.current.formik.values.endAt).toBe(end);
  });

  it("handleDateRangeChange does nothing when range is null", async () => {
    const { result } = renderHook(() => useOverviewForm({ data: defaultData }));

    await act(async () => {
      result.current.handleDateRangeChange(null);
    });

    expect(result.current.formik.values.startAt).toBeNull();
  });
});
