import React, { useState } from "react";
import { ProfileBaseInput } from "../profile-input/ProfileBaseInput";
import Icon from "@mdi/react";
import { mdiEye, mdiEyeOff } from "@mdi/js";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ProfilePasswordInput.module.scss";

interface ProfilePasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const ProfilePasswordInput: React.FC<ProfilePasswordInputProps> = ({
  error,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = showPassword ? "text" : "password";

  return (
    <ProfileBaseInput
      {...props}
      type={inputType}
      originalType="password"
      error={error}
    >
      {props.value && props.value.toString().length > 0 && (
        <button
          type="button"
          className={styles.eyeButton}
          onClick={() => setShowPassword(!showPassword)}
        >
          <AnimatePresence mode="popLayout">
            <motion.div
              key={showPassword ? "eyeOff" : "eye"}
              initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 20, scale: 0.8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <Icon
                path={showPassword ? mdiEyeOff : mdiEye}
                size={1}
                color="rgba(0,0,0,0.6)"
              />
            </motion.div>
          </AnimatePresence>
        </button>
      )}
    </ProfileBaseInput>
  );
};
