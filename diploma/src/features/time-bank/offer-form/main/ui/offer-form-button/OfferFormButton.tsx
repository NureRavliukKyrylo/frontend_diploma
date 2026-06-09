import { OfferFormModal } from "../main-form/OfferFormModal";
import { useOfferFormStore, type OfferFormData } from "@entities/offer";
import styles from "./OfferFormButton.module.scss";
import { EditIcon, PlusIcon } from "@shared/assets/icons/actions";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { motion } from "framer-motion";

interface OfferFormButtonProps {
  isEdit?: boolean;
  initialValues?: Partial<OfferFormData>;
}

export const OfferFormButton = ({
  isEdit = false,
  initialValues,
}: OfferFormButtonProps) => {
  const { isOpen, data, open, close } = useOfferFormStore();

  const isThisOpen = isOpen && data.id === (initialValues?.id ?? null);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <BaseButtonWrapper
          className={isEdit ? styles.editButton : styles.createButton}
          onClick={() => open(initialValues)}
        >
          {isEdit ? (
            <>
              <EditIcon className={styles.icon} />
              Edit
            </>
          ) : (
            <>
              <img src={PlusIcon} className={styles.icon} />
              Create new offer
            </>
          )}
        </BaseButtonWrapper>
      </motion.div>
      <OfferFormModal isOpen={isThisOpen} onClose={close} isEdit={isEdit} />
    </>
  );
};
