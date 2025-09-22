import styles from "./SignUpForm.module.scss";
import { DefaultInput } from "../../../../shared/inputs";
import { Checkbox } from "../../../../shared/checkBox";
import { useErrorStore } from "../../../../shared/stores";
import { AuthButton } from "../../../../shared/buttons/auth";
import { useState } from "react";
import { DropdownMenu } from "../../../../shared/dropdowns";

export const SignUpForm = () => {
  const serverError = useErrorStore((state) => state.serverError);
  const fakeRoles = [
    { label: "Volunteer", value: "volunteer" },
    { label: "Organizer", value: "organizer" },
    { label: "Admin", value: "admin" },
  ];
  const [role, setRole] = useState(fakeRoles[0].value);
  return (
    <>
      <div className={styles.headerSignUp}>
        <h1>Create an account</h1>
      </div>
      <form>
        <div className={styles.inputsSignUp}>
          <div className={styles.inputsFullName}>
            <DefaultInput
              id="firstName"
              name="firstName"
              type="text"
              label="First name"
            />
            <DefaultInput
              id="lastName"
              name="lastName"
              type="text"
              label="Last name"
            />
          </div>
          <DefaultInput
            id="email"
            name="email"
            type="email"
            label="Email Address"
          />
          <DropdownMenu
            value={role}
            onChange={(val) => setRole(val)}
            options={fakeRoles}
          />
        </div>
        <div className={styles.agreement}>
          <Checkbox name="agreement" />I agree to the {""}
          <span>Terms of services and private policy </span>
        </div>
        <div className={styles.buttonBlock}>
          <AuthButton label="Create an account" />
          {serverError && <div className="errorMessage">{serverError}</div>}
        </div>
      </form>
    </>
  );
};
