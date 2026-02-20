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

export const fileField = ({
  maxSize = DEFAULT_MAX_SIZE,
  formats = DEFAULT_IMAGE_FORMATS,
  sizeMessage = `File too large (max ${DEFAULT_MAX_SIZE / 1024 / 1024}MB)`,
  formatMessage = "Unsupported file format",
}: FileFieldOptions = {}) =>
  Yup.mixed<File | string>()
    .nullable()
    .test("fileType", formatMessage, (value) => {
      if (!value || typeof value === "string") return true;
      return formats.includes((value as File).type);
    })
    .test("fileSize", sizeMessage, (value) => {
      if (!value || typeof value === "string") return true;
      return (value as File).size <= maxSize;
    });
