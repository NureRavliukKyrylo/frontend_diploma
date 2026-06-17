import { useRef, useState, useMemo, useEffect } from "react";
import { getSettingsMainFormSchema } from "@features/profile/main-settings-form/libs/settingsMainFormSchema";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

interface UseUploadImageParams {
  src?: string | File | null;
  onChange: (file: File | null) => void;
}

export const useUploadImage = ({ src, onChange }: UseUploadImageParams) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation("profile");
  const validationSchema = getSettingsMainFormSchema(t);
  const [isModalCropOpen, setIsModalCropOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    try {
      setError(null);

      await validationSchema.validateAt("avatar", { avatar: file });

      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      setIsModalCropOpen(true);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        setError(err.message);
      }
    }

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
    handleChange,
    handleSave,
    handleClose,
    error,
  };
};
