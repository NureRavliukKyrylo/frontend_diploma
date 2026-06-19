import React, { useEffect, useRef, useState } from "react";
import styles from "./TextArea.module.scss";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  maxLength?: number;
  placeHolder?: string;
  minHeight?: number;
  variant?: "default" | "profile";
  textareaClassName?: string;
  charCountClassName?: string;
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
  textareaClassName = "",
  charCountClassName = "",
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [textLength, setTextLength] = useState(
    value
      ? value.toString().length
      : defaultValue
        ? defaultValue.toString().length
        : 0,
  );

  const hasText = textLength > 0;

  const isActive = isFocused || hasText;

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };

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
          className={`${styles.textarea} ${variantClass} ${textareaClassName} ${isActive ? styles.focused : ""}`}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          maxLength={maxLength}
          placeholder={placeHolder}
          style={{
            minHeight: `${minHeight}px`,
          }}
          {...props}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <div className={`${styles.charCount} ${variantClass} ${charCountClassName}`}>
          {textLength}/{maxLength}
        </div>
      </div>
      {error && <div className="errorInput">{error}</div>}
    </div>
  );
};
