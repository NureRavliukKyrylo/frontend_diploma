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
import { stepConstants } from "../../constants";

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

  return (
    <div>
      <Stepper activeStep={activeStep} orientation="vertical">
        {stepConstants.steps.map((step, index) => (
          <Step key={index}>
            <StepLabel StepIconComponent={CustomStepIcon}>
              {step.title}
              <StepContent>{step.description}</StepContent>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
