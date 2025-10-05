import React, { useEffect, useRef, useState } from "react";
import styles from "./TextArea.module.scss";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  maxLength?: number;
  placeHolder?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  error,
  value,
  defaultValue,
  onChange,
  maxLength = 300,
  placeHolder = "Tell us a little about yourself.",
  ...props
}) => {
  const [textLength, setTextLength] = useState(
    value
      ? value.toString().length
      : defaultValue
      ? defaultValue.toString().length
      : 0
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

  return (
    <div className={`${styles.textareaWrapper} ${error ? styles.error : ""}`}>
      <textarea
        ref={textareaRef}
        className={styles.textarea}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        maxLength={maxLength}
        placeholder={placeHolder}
        {...props}
      />
      <div className={styles.charCount}>
        {textLength}/{maxLength}
      </div>
      {error && <div className={styles.errorInput}>{error}</div>}
    </div>
  );
};
