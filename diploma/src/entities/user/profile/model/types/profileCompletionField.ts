export interface ProfileCompletion {
  percent: number;
  missingFields: ProfileCompletionField[];
}

export type ProfileCompletionField =
  | "bio"
  | "avatar"
  | "phone"
  | "dateOfBirth"
  | "location"
  | "socialLinks"
  | "skills";
