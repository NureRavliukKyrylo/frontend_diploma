import { BaseButtonWrapper } from "@shared/ui/buttons";
import styles from "./DeleteProfileButton.module.scss";
import { useState } from "react";
import { DeleteProfileModal } from "./DeleteProfileModal";
import { motion } from "framer-motion";

export const DeleteProfileButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen((prev) => !prev);
  };

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
          DELETE PROFILE
        </BaseButtonWrapper>
      </motion.div>
      <DeleteProfileModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};
