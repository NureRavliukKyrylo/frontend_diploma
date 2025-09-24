import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  type StepIconProps,
} from "@mui/material";
import Check from "@mui/icons-material/Check";
import "./StepperStyles.scss";
import { useStepperStore } from "../../../entities/user";

type StepItem = {
  label: string;
  description: string;
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

export function StepperForm() {
  const { activeStep } = useStepperStore();

  const steps: StepItem[] = [
    { label: "Step 1", description: "This is the first step" },
    { label: "Step 2", description: "Now add more details here" },
    { label: "Step 3", description: "Final review before finishing" },
  ];

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
    </div>
  );
}
