import { useFormik } from "formik";
import { useRef, useEffect } from "react";
import { useAuthStore } from "../../../../entities/user";
import { imageSchema } from "../libs/imageSchema";
export const useImageForm = () => {
  const setAvatarUrl = useAuthStore((s) => s.setAvatarUrl);
  const nextStep = useAuthStore((s) => s.nextStep);

  const inputRef = useRef<HTMLInputElement>(null);

  const formik = useFormik({
    initialValues: { avatar: null },
    validationSchema: imageSchema,
    enableReinitialize: true,
    validateOnChange: true,
    onSubmit: (values) => {
      console.log("[DEBUG] Formik onSubmit called with values:", values);
      console.log("[DEBUG] Formik errors at submit:", formik.errors);
      console.log("[DEBUG] Formik isValid at submit:", formik.isValid);
      nextStep();
    },
  });

  useEffect(() => {
    console.log("[DEBUG] Formik state changed:", {
      values: formik.values,
      errors: formik.errors,
      touched: formik.touched,
      isValid: formik.isValid,
    });
  }, [formik.values, formik.errors, formik.touched, formik.isValid]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0] || null;
    console.log("[DEBUG] Selected file:", file);

    if (file) {
      formik.setFieldValue("avatar", file, true);

      const reader = new FileReader();
      reader.onloadend = () => {
        const url = reader.result as string;
        setAvatarUrl(url);
      };
      reader.readAsDataURL(file);
    }
    console.log("Selected now", formik.values.avatar);
  };

  return {
    formik,
    inputRef,
    handleFileChange,
    handleSubmit: () => {
      console.log("[DEBUG] handleSubmit called");
      console.log("formik.errors before submit:", formik.errors);
      console.log("formik.isValid before submit:", formik.isValid);
      formik.handleSubmit();
    },
  };
};
