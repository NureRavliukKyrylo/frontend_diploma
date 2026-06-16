import { useFormik } from "formik";
import { useRef } from "react";
import { useAuthStore } from "@entities/user";
import { getImageSchema } from "../libs/imageSchema";
import { useTranslation } from "react-i18next";

export const useImageForm = () => {
  const setAvatarFile = useAuthStore((s) => s.setAvatarFile);
  const avatarFile = useAuthStore((s) => s.avatarFile);
  const nextStep = useAuthStore((s) => s.nextStep);
  const { t } = useTranslation(["common", "auth"]);
  const validationSchema = getImageSchema(t);

  const inputRef = useRef<HTMLInputElement>(null);

  const formik = useFormik({
    initialValues: { avatar: avatarFile },
    validationSchema: validationSchema,
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
    const file = e.currentTarget.files?.[0];
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
