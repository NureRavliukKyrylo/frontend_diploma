import React, { useEffect, useRef, useState } from "react";
import styles from "./TextArea.module.scss";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  maxLength?: number;
  placeHolder?: string;
  minHeight?: number;
  variant?: "default" | "profile";
}

export const TextArea: React.FC<TextAreaProps> = ({
  error,
  value,
  defaultValue,
  onChange,
  maxLength = 300,
  placeHolder = "Tell us a little about yourself.",
  minHeight = 120,
  variant = "default",
  ...props
}) => {
  const [textLength, setTextLength] = useState(
    value
      ? value.toString().length
      : defaultValue
        ? defaultValue.toString().length
        : 0,
  );

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!maxLength || e.target.value.length <= maxLength) {
      setTextLength(e.target.value.length);
      onChange?.(e);
      autoResize();
    }
  };

  const autoResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };

  useEffect(() => {
    autoResize();

    const handleResize = () => {
      autoResize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const variantClass = variant !== "default" ? styles[variant] : "";

  return (
    <div className={`${styles.commonWrapperTextArea} ${variantClass}`}>
      <div
        className={`${styles.textareaWrapper} ${variantClass} ${error ? styles.error : ""}`}
      >
        <textarea
          ref={textareaRef}
          className={`${styles.textarea} ${variantClass}`}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          maxLength={maxLength}
          placeholder={placeHolder}
          style={{
            minHeight: `${minHeight}px`,
          }}
          {...props}
        />
        <div className={`${styles.charCount} ${variantClass}`}>
          {textLength}/{maxLength}
        </div>
      </div>
      {error && <div className="errorInput">{error}</div>}
    </div>
  );
};
