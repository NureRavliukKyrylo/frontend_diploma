import { type StateCreator } from "zustand";
import { SocialPlatform } from "@shared/config/index.ts";
import {
  type Profile,
  type PrivacySettings,
  type Coordinates,
  type PrivacyField,
} from "../types/profileTypes";
import { fileToBase64 } from "@shared/libs/index.ts";

export interface UserProfileSlice {
  profile?: Profile;
  privacySettings?: PrivacySettings;
  avatarFile?: File | undefined;
  avatarUrl?: string | undefined;
  isLoading?: boolean;
  setAvatarFile: (file: File | undefined) => void;
  setBio: (val: string | undefined) => void;
  setDateOfBirth: (val: string | undefined) => void;
  setSocialLink: (platform: SocialPlatform, url: string) => void;
  removeSocialLink: (platform: SocialPlatform) => void;
  setCoordinates: (val: Coordinates | null) => void;
  setPrivacyField: (fieldName: string, field: PrivacyField) => void;
  removePrivacyField: (fieldName: string) => void;
  setLoading: (loading: boolean) => void;
  clearFillingForm: () => void;
}

export const createUserProfileSlice: StateCreator<UserProfileSlice> = (
  set
) => ({
  setAvatarFile: (file: File | undefined) => {
    if (!file) {
      set({ avatarFile: undefined, avatarUrl: undefined });
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
  setLoading: (loading) => set({ isLoading: loading }),
  clearFillingForm: () =>
    set({
      isLoading: undefined,
      avatarFile: undefined,
      avatarUrl: undefined,
      profile: {
        bio: undefined,
        dateOfBirth: undefined,
        socialLinks: undefined,
        coordinates: undefined,
      },
      privacySettings: undefined,
    }),
});
