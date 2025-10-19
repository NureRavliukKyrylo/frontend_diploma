import { useFormik } from "formik";
import { useRef } from "react";
import { useAuthStore } from "@entities/user";
import { imageSchema } from "../libs/imageSchema";

export const useImageForm = () => {
  const setAvatarFile = useAuthStore((s) => s.setAvatarFile);
  const avatarFile = useAuthStore((s) => s.avatarFile);
  const nextStep = useAuthStore((s) => s.nextStep);

  const inputRef = useRef<HTMLInputElement>(null);

  const formik = useFormik({
    initialValues: { avatar: avatarFile || null },
    validationSchema: imageSchema,
    enableReinitialize: true,
    validateOnChange: true,
    onSubmit: (values) => {
      if (values.avatar) {
        setAvatarFile(values.avatar);
      }
      nextStep();
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0] || null;
    if (file) {
      formik.setFieldValue("avatar", file, true);
    }
  };

  return {
    formik,
    inputRef,
    handleFileChange,
    handleSubmit: formik.handleSubmit,
  };
};
