import * as React from "react";
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  type StepIconProps,
} from "@mui/material";
import Check from "@mui/icons-material/Check";
import "./SteperStyles.scss";

type StepItem = {
  label: string;
  description: string;
};

type StepperFormProps = {
  onFinish?: () => void;
};

function CustomStepIcon(props: StepIconProps) {
  const { active, completed, icon } = props;

  return (
    <div
      className={`MuiStepIcon-root ${completed ? "Mui-completed" : ""} ${
        active ? "Mui-active" : ""
      }`}
    >
      {completed ? (
        <Check className="CustomStepIcon-completedIcon" />
      ) : (
        <span className="MuiStepIcon-text">{icon}</span>
      )}
    </div>
  );
}

export function StepperForm({ onFinish }: StepperFormProps) {
  const [activeStep, setActiveStep] = React.useState<number>(0);

  const steps: StepItem[] = [
    { label: "Step 1", description: "This is the first step" },
    { label: "Step 2", description: "Now add more details here" },
    { label: "Step 3", description: "Final review before finishing" },
  ];

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      onFinish?.();
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      onFinish?.();
    }
  };

  const handleReset = () => setActiveStep(0);

  return (
    <div>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel StepIconComponent={CustomStepIcon}>
              {step.label}
              <StepContent>{step.description}</StepContent>
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <div>
        {activeStep === steps.length ? (
          <div>
            <h3>All steps completed 🎉</h3>
            <button onClick={handleReset}>Reset</button>
          </div>
        ) : (
          <>
            <div>
              <button onClick={handleSkip} style={{ marginRight: "0.5rem" }}>
                Skip
              </button>
              <button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Continue"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
