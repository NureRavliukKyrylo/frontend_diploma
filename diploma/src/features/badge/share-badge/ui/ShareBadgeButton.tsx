import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ShareBadgeButton.module.scss";
import {
  getSocialShareNetworks,
  type ShareParams,
} from "../config/socialShareNetworks";
import { ShareIcon } from "@shared/assets/icons/actions";

export const ShareBadgeButton = ({ text, pageUrl, hashtags }: ShareParams) => {
  const [isOpen, setIsOpen] = useState(false);
  const networks = getSocialShareNetworks(hashtags);

  return (
    <div className={styles.socialNetworksWrapper}>
      <AnimatePresence>
        {isOpen && (
          <>
            <div className={styles.backdrop} onClick={() => setIsOpen(false)} />
            <motion.div
              className={styles.networksPanel}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              style={{ translateY: "-50%" }}
            >
              {networks.map(({ id, Button, Icon, extra }, index) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ delay: index * 0.04 }}
                >
                  <Button
                    url={pageUrl}
                    title={text}
                    className={styles.networkBtn}
                    {...extra}
                  >
                    <Icon size={36} round />
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <motion.img
        className={styles.shareButton}
        src={ShareIcon}
        onClick={() => setIsOpen((p) => !p)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.85 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </div>
  );
};
