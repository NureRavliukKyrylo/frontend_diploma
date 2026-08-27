import type { TFunction } from "i18next";
import * as Yup from "yup";

const DEFAULT_IMAGE_FORMATS = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/svg+xml",
  "image/gif",
];

const DEFAULT_MAX_SIZE = 5 * 1024 * 1024;

interface FileFieldOptions {
  maxSize?: number;
  formats?: string[];
  sizeMessage?: string;
  formatMessage?: string;
}

export const fileField = (
  {
    maxSize = DEFAULT_MAX_SIZE,
    formats = DEFAULT_IMAGE_FORMATS,
    sizeMessage,
    formatMessage,
  }: FileFieldOptions = {},
  t?: TFunction,
) =>
  Yup.mixed<File | string>()
    .nullable()
    .test(
      "fileType",
      formatMessage ??
        t?.("common:validation.unsupportedFormat") ??
        "Unsupported file format",
      (value) => {
        if (!value || typeof value === "string") return true;
        return formats.includes((value as File).type);
      },
    )
    .test(
      "fileSize",
      sizeMessage ??
        t?.("common:validation.fileTooLarge", {
          size: maxSize / 1024 / 1024,
        }) ??
        `File too large (max ${maxSize / 1024 / 1024}MB)`,
      (value) => {
        if (!value || typeof value === "string") return true;
        return (value as File).size <= maxSize;
      },
    );
