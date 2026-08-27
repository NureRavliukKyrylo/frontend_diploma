import { useLocationForm } from "@features/time-bank/offer-form/location-step/model/useLocationForm";
import { renderHook, act, waitFor } from "@testing-library/react";

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
  title: "",
  description: "",
  priceMinutes: 0,
  startAt: null,
  endAt: null,
  isOnline: false,
  location: null,
  categories: [],
  skills: [],
};

describe("useLocationForm", () => {
  beforeEach(() => vi.clearAllMocks());

  it("initializes with null location", () => {
    const { result } = renderHook(() => useLocationForm({ data: defaultData }));
    expect(result.current.formik.values.location).toBeNull();
    expect(result.current.coordinates).toBeNull();
  });

  it("initializes with existing location", () => {
    const data = {
      ...defaultData,
      location: { latitude: 50.4, longitude: 30.5 },
    };
    const { result } = renderHook(() => useLocationForm({ data }));
    expect(result.current.coordinates).toEqual({
      latitude: 50.4,
      longitude: 30.5,
    });
  });

  it("handleLocationChange updates coordinates", async () => {
    const { result } = renderHook(() => useLocationForm({ data: defaultData }));

    await act(async () => {
      result.current.handleLocationChange({ latitude: 48.8, longitude: 2.3 });
    });

    expect(result.current.formik.values.location?.latitude).toBe(48.8);
    expect(result.current.formik.values.location?.longitude).toBe(2.3);
  });

  it("calls setData on valid submit", async () => {
    const data = {
      ...defaultData,
      location: { latitude: 50.4, longitude: 30.5 },
    };
    const { result } = renderHook(() => useLocationForm({ data }));

    await act(async () => {
      await result.current.formik.submitForm();
    });

    await waitFor(() => {
      expect(setDataMock).toHaveBeenCalledWith(
        expect.objectContaining({
          location: { latitude: 50.4, longitude: 30.5 },
        }),
      );
    });
  });

  it("returns null coordinates when location is partial", () => {
    const data = {
      ...defaultData,
      location: { latitude: 50.4, longitude: null as any },
    };
    const { result } = renderHook(() => useLocationForm({ data }));
    expect(result.current.coordinates).toBeNull();
  });
});
