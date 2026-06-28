import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useCreateTaskForm } from "../model/useCreateTaskForm";
import { CreateTaskActions } from "./components/CreateTaskActions";
import { CreateTaskDrawerHeader } from "./components/CreateTaskDrawerHeader";
import { CreateTaskHeading } from "./components/CreateTaskHeading";
import { CreateTaskStepContent } from "./components/CreateTaskStepContent";
import { CreateTaskStepIndicator } from "./components/CreateTaskStepIndicator";
import { STEPS } from "./config/createTaskDrawerConfig";
import { useCreateTaskDrawerLifecycle } from "./lib/useCreateTaskDrawerLifecycle";
import styles from "./CreateTaskDrawer.module.scss";

export interface CreateTaskDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  organizationId: string;
  projectId?: string;
  eventId?: string;
  orgName?: string;
}

export const CreateTaskDrawer = ({
  isOpen,
  onClose,
  organizationId,
  projectId,
  eventId,
  orgName,
}: CreateTaskDrawerProps) => {
  const form = useCreateTaskForm({
    organizationId,
    projectId,
    eventId,
    onSuccess: onClose,
  });
  const isLastStep = form.activeStep === STEPS.length - 1;

  useCreateTaskDrawerLifecycle(isOpen, onClose, form);

  const handlePrimaryAction = () => {
    if (isLastStep) {
      form.submit();
      return;
    }

    form.goNext();
  };

  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.button
            type="button"
            className={styles.backdrop}
            aria-label="Close create task drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.aside
            className={styles.drawer}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.225, ease: [0, 0, 0.2, 1] }}
          >
            <CreateTaskDrawerHeader orgName={orgName} onClose={onClose} />
            <CreateTaskStepIndicator
              activeStep={form.activeStep}
              onStepClick={form.goToStep}
            />

            <div className={styles.drawerScroll}>
              <CreateTaskHeading activeStep={form.activeStep} />
              <div key={form.activeStep}>
                <CreateTaskStepContent form={form} />
              </div>
              <CreateTaskActions
                activeStep={form.activeStep}
                isLastStep={isLastStep}
                isSubmitting={form.isSubmitting}
                onBack={form.goBack}
                onPrimaryAction={handlePrimaryAction}
              />
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
};
