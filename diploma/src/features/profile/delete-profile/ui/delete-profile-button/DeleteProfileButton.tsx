import { BaseButtonWrapper } from "@shared/ui/buttons";
import styles from "./DeleteProfileButton.module.scss";
import { useState } from "react";
import { DeleteProfileModal } from "../delete-profile-modal/DeleteProfileModal";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const DeleteProfileButton = () => {
  const { t } = useTranslation("profile");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ x: [0, -4, 4, -4, 4, 0] }}
        whileTap={{ scale: 0.95 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <BaseButtonWrapper
          className={styles.deleteAccountButton}
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          {t("deleteProfile.button")}
        </BaseButtonWrapper>
      </motion.div>
      <DeleteProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen((prev) => !prev)}
      />
    </>
  );
};
