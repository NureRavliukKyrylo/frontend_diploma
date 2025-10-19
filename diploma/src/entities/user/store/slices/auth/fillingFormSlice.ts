import { type StateCreator } from "zustand";
import { SocialPlatform } from "../../../../../shared/config/index.ts";
import {
  type Profile,
  type PrivacySettings,
  type Coordinates,
  type PrivacyField,
} from "../../../index.ts";
import { fileToBase64 } from "../../../../../shared/libs/index.ts";

export interface UserFillingSlice {
  profile?: Profile;
  privacySettings?: PrivacySettings;
  avatarFile?: File | null;
  avatarUrl?: string | null;

  setAvatarFile: (file: File | null) => void;
  setBio: (val: string) => void;
  setDateOfBirth: (val: string | null) => void;
  setSocialLink: (platform: SocialPlatform, url: string) => void;
  removeSocialLink: (platform: SocialPlatform) => void;
  setCoordinates: (val: Coordinates | null) => void;
  setPrivacyField: (fieldName: string, field: PrivacyField) => void;
  removePrivacyField: (fieldName: string) => void;
  clearProfile: () => void;
}

export const createUserFillingSlice: StateCreator<UserFillingSlice> = (
  set
) => ({
  setAvatarFile: (file: File | null) => {
    if (!file) {
      set({ avatarFile: null, avatarUrl: null });
      return;
    }
    set({ avatarFile: file });
    fileToBase64(file).then((base64) => {
      set({ avatarUrl: base64 });
    });
  },
  setBio: (val) =>
    set((state) => ({ profile: { ...state.profile, bio: val } })),
  setDateOfBirth: (val) =>
    set((state) => ({ profile: { ...state.profile, dateOfBirth: val } })),
  setSocialLink: (platform, url) =>
    set((state) => {
      const existingLinks = state.profile?.socialLinks ?? [];
      const updatedLinks = existingLinks.some((l) => l.platform === platform)
        ? existingLinks.map((l) =>
            l.platform === platform ? { ...l, url } : l
          )
        : [...existingLinks, { platform, url }];

      return {
        profile: {
          ...state.profile,
          socialLinks: updatedLinks,
        },
      };
    }),
  removeSocialLink: (platform) =>
    set((state) => {
      const existingLinks = state.profile?.socialLinks ?? [];
      return {
        profile: {
          ...state.profile,
          socialLinks: existingLinks.filter((l) => l.platform !== platform),
        },
      };
    }),
  setCoordinates: (val) =>
    set((state) => ({ profile: { ...state.profile, coordinates: val } })),
  setPrivacyField: (fieldName, field) =>
    set((state) => {
      const fields =
        state.privacySettings?.fields?.filter(
          (f) => f.fieldName !== fieldName
        ) ?? [];

      return {
        privacySettings: {
          ...state.privacySettings,
          fields: [...fields, field],
        },
      };
    }),
  removePrivacyField: (fieldName) =>
    set((state) => {
      const fields = state.privacySettings?.fields ?? [];
      return {
        privacySettings: {
          ...state.privacySettings,
          fields: fields.filter((f) => f.fieldName !== fieldName),
        },
      };
    }),
  clearProfile: () =>
    set({
      profile: {
        bio: "",
        phone: "",
        dateOfBirth: "",
        socialLinks: [],
        coordinates: { longitude: 0, latitude: 0 },
      },
      privacySettings: { fields: [] },
    }),
});
