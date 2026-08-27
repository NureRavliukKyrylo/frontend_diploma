import type { Skill } from "@entities/skill";
import { useSkillsForm } from "@features/time-bank/offer-form/skills-step/model/useSkillsForm";
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

const skill1: Skill = {
  id: "s1",
  name: "Skill 1",
  iconUrl: "https://example.com/skill1.svg",
  description: "Description for Skill 1",
  level: "Beginner",
  categories: [],
};

const skill2: Skill = {
  id: "s2",
  name: "Skill 2",
  iconUrl: "https://example.com/skill2.svg",
  description: "Description for Skill 2",
  level: "Intermediate",
  categories: [],
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

describe("useSkillsForm", () => {
  beforeEach(() => vi.clearAllMocks());

  it("initializes with existing skills", () => {
    const { result } = renderHook(() =>
      useSkillsForm({ data: { ...defaultData, skills: [skill1] } }),
    );
    expect(result.current.formik.values.skills).toEqual([skill1]);
  });

  it("toggleSkill adds skill when not selected", async () => {
    const { result } = renderHook(() => useSkillsForm({ data: defaultData }));

    await act(async () => {
      result.current.toggleSkill(skill1);
    });

    expect(result.current.formik.values.skills).toContainEqual(skill1);
  });

  it("toggleSkill removes skill when already selected", async () => {
    const { result } = renderHook(() =>
      useSkillsForm({ data: { ...defaultData, skills: [skill1, skill2] } }),
    );

    await act(async () => {
      result.current.toggleSkill(skill1);
    });

    expect(result.current.formik.values.skills).not.toContainEqual(skill1);
    expect(result.current.formik.values.skills).toContainEqual(skill2);
  });

  it("calls setData on submit", async () => {
    const { result } = renderHook(() =>
      useSkillsForm({ data: { ...defaultData, skills: [skill1] } }),
    );

    await act(async () => {
      await result.current.formik.submitForm();
    });

    expect(setDataMock).toHaveBeenCalledWith(
      expect.objectContaining({ skills: [skill1] }),
    );
  });
});
