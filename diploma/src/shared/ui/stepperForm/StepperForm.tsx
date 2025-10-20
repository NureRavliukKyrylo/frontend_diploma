import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  type StepIconProps,
} from "@mui/material";
import Check from "@mui/icons-material/Check";
import { motion, AnimatePresence } from "framer-motion";
import "./StepperStyles.scss";
import { useAuthStore } from "@entities/user";
import { stepConstants } from "@pages/auth";

function CustomStepIcon(props: StepIconProps) {
  const { active, completed, icon } = props;
  const showCheck = completed && !active;

  return (
    <motion.div
      style={{ position: "relative" }}
      className={`MuiStepIcon-root ${showCheck ? "Mui-completed" : ""} ${
        active ? "Mui-active" : ""
      }`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{
        scale: active ? 1.2 : 1,
        opacity: 1,
      }}
      transition={{ type: "spring", stiffness: 600, damping: 10 }}
    >
      <AnimatePresence initial={false}>
        {showCheck ? (
          <motion.div
            key="check"
            style={{ position: "absolute" }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <Check className="CustomStepIcon-completedIcon" />
          </motion.div>
        ) : (
          <motion.span
            key="icon"
            style={{ position: "absolute" }}
            className="MuiStepIcon-text"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            {icon}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function StepperForm() {
  const { activeStep, isStepSkipped, isStepCompleted } = useAuthStore();

  return (
    <div>
      <Stepper activeStep={activeStep} orientation="vertical">
        {stepConstants.steps.map((step, index) => {
          const skipped = isStepSkipped(index);
          const completed = isStepCompleted(index);
          const isActive = activeStep === index;

          return (
            <Step key={index} completed={completed && !skipped && !isActive}>
              <StepLabel StepIconComponent={CustomStepIcon}>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{
                    opacity: isActive ? 1 : 0.6,
                    x: isActive ? 0 : -5,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {step.title}
                </motion.div>
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <StepContent>{step.description}</StepContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
}
