import type { Category } from "@entities/category";
import { useCategoriesForm } from "@features/time-bank/offer-form/categories-step/model/useCategoriesForm";
import { renderHook, act } from "@testing-library/react";

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

const cat1: Category = {
  id: "c1",
  name: "Category 1",
  description: "",
  imageUrl: "",
  activitiesTotal: 0,
  activitiesActive: 0,
  activitiesCompleted: 0,
  skills: [],
};

const cat2: Category = {
  id: "c2",
  name: "Category 2",
  description: "",
  imageUrl: "",
  activitiesTotal: 0,
  activitiesActive: 0,
  activitiesCompleted: 0,
  skills: [],
};

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

describe("useCategoriesForm", () => {
  beforeEach(() => vi.clearAllMocks());

  it("initializes with existing categories", () => {
    const { result } = renderHook(() =>
      useCategoriesForm({ data: { ...defaultData, categories: [cat1] } }),
    );
    expect(result.current.formik.values.categories).toEqual([cat1]);
  });

  it("toggleCategory adds category when not selected", async () => {
    const { result } = renderHook(() =>
      useCategoriesForm({ data: defaultData }),
    );

    await act(async () => {
      result.current.toggleCategory(cat1);
    });

    expect(result.current.formik.values.categories).toContainEqual(cat1);
  });

  it("toggleCategory removes category when already selected", async () => {
    const { result } = renderHook(() =>
      useCategoriesForm({ data: { ...defaultData, categories: [cat1, cat2] } }),
    );

    await act(async () => {
      result.current.toggleCategory(cat1);
    });

    expect(result.current.formik.values.categories).not.toContainEqual(cat1);
    expect(result.current.formik.values.categories).toContainEqual(cat2);
  });

  it("calls setData on submit", async () => {
    const { result } = renderHook(() =>
      useCategoriesForm({ data: { ...defaultData, categories: [cat1] } }),
    );

    await act(async () => {
      await result.current.formik.submitForm();
    });

    expect(setDataMock).toHaveBeenCalledWith(
      expect.objectContaining({ categories: [cat1] }),
    );
  });
});
