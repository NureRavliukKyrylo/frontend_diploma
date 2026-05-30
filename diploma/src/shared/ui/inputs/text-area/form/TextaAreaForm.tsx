import type { TextareaHTMLAttributes } from "react";
import styles from "./TextAreaForm.module.scss";
import clsx from "clsx";

interface TextAreaFormProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export const TextAreaForm = ({ className, ...props }: TextAreaFormProps) => {
  return <textarea className={clsx(styles.textarea, className)} {...props} />;
};
