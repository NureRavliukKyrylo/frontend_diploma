import { type StateCreator } from "zustand";

export interface Coordinates {
  longitude: number;
  latitude: number;
}

export interface PrivacyField {
  fieldName: string;
  visibility: number;
}

export interface PrivacySettings {
  fields: PrivacyField[];
}

export interface Profile {
  avatarUrl: string;
  bio: string;
  phone: string;
  dateOfBirth: string;
  telegram: string;
  coordinates: Coordinates | null;
}

export interface UserFillingSlice {
  email: string;
  profile: Profile;
  privacySettings: PrivacySettings;

  setEmail: (val: string) => void;
  setAvatarUrl: (val: string) => void;
  setBio: (val: string) => void;
  setPhone: (val: string) => void;
  setDateOfBirth: (val: string) => void;
  setTelegram: (val: string) => void;
  setCoordinates: (val: Coordinates | null) => void;
  setPrivacyField: (fieldName: string, field: PrivacyField) => void;
  clearProfile: () => void;
}

export const createUserFillingSlice: StateCreator<UserFillingSlice> = (
  set
) => ({
  firstName: "",
  lastName: "",
  email: "",
  profile: {
    avatarUrl: "",
    bio: "",
    phone: "",
    dateOfBirth: "",
    telegram: "",
    coordinates: null,
  },
  privacySettings: {
    userId: "",
    fields: [],
  },

  setEmail: (val) => set({ email: val }),
  setAvatarUrl: (val) =>
    set((state) => ({ profile: { ...state.profile, avatarUrl: val } })),
  setBio: (val) =>
    set((state) => ({ profile: { ...state.profile, bio: val } })),
  setPhone: (val) =>
    set((state) => ({ profile: { ...state.profile, phone: val } })),
  setDateOfBirth: (val) =>
    set((state) => ({ profile: { ...state.profile, dateOfBirth: val } })),
  setTelegram: (val) =>
    set((state) => ({ profile: { ...state.profile, telegram: val } })),
  setCoordinates: (val) =>
    set((state) => ({ profile: { ...state.profile, coordinates: val } })),
  setPrivacyField: (fieldName, field) =>
    set((state) => {
      const fields = state.privacySettings.fields.filter(
        (f) => f.fieldName !== fieldName
      );
      return {
        privacySettings: {
          ...state.privacySettings,
          fields: [...fields, field],
        },
      };
    }),
  clearProfile: () =>
    set({
      email: "",
      profile: {
        avatarUrl: "",
        bio: "",
        phone: "",
        dateOfBirth: "",
        telegram: "",
        coordinates: { longitude: 0, latitude: 0 },
      },
      privacySettings: { fields: [] },
    }),
});
