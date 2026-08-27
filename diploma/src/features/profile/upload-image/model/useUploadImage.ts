import { useRef, useState, useMemo, useEffect } from "react";
import { fileField } from "@shared/libs/validation";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

interface UseUploadImageParams {
  src?: string | File | null;
  onChange: (file: File | null) => void;
  maxSize?: number;
  formats?: string[];
  sizeMessage?: string;
  formatMessage?: string;
}

export const useUploadImage = ({
  src,
  onChange,
  maxSize,
  formats,
  sizeMessage,
  formatMessage,
}: UseUploadImageParams) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation("profile");
  const [isModalCropOpen, setIsModalCropOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFile = async (file: File) => {
    try {
      setError(null);

      await fileField({
        maxSize,
        formats,
        sizeMessage,
        formatMessage,
      }, t).validate(file);

      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      setIsModalCropOpen(true);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        setError(err.message);
      }
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    await handleFile(file);

    e.target.value = "";
  };

  const handleSave = (file: File) => {
    onChange(file);
    setIsModalCropOpen(false);
    setPreview(null);
  };

  const handleClose = () => {
    setIsModalCropOpen(false);
    setPreview(null);
  };

  const displaySrc = useMemo(() => {
    if (src instanceof File) {
      return URL.createObjectURL(src);
    }
    return src ?? null;
  }, [src]);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
      if (src instanceof File) URL.revokeObjectURL(displaySrc as string);
    };
  }, [preview, src, displaySrc]);

  return {
    inputRef,
    isModalCropOpen,
    preview,
    displaySrc,
    handleClick,
    handleFile,
    handleChange,
    handleSave,
    handleClose,
    error,
  };
};
