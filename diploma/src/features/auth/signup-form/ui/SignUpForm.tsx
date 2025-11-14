import styles from "./SignUpForm.module.scss";
import { BaseInput, EmailInput, PasswordInput } from "@shared/ui/inputs";
import { Checkbox } from "@shared/ui/inputs";
import { useRegistration } from "../model/useRegistration";
import { useAuthStore } from "@entities/user";
import { useErrorStore } from "@shared/config";
import { BaseButtonWrapper } from "@shared/ui/buttons";

export const SignUpForm = () => {
  const { formik, isLoading } = useRegistration();
  const {
    setSignUpEmail,
    setSignUpPassword,
    setSignFirstName,
    setSignLastName,
    setAgreement,
  } = useAuthStore();
  const serverError = useErrorStore((state) => state.errors["signUpError"]);
  return (
    <>
      <div className={styles.headerSignUp}>
        <h1>Create an account</h1>
      </div>
      <form onSubmit={formik.handleSubmit} className={styles.signUpForm}>
        <div className={styles.inputsSignUp}>
          <div className={styles.inputsFullName}>
            <BaseInput
              id="firstName"
              name="firstName"
              type="text"
              label="Enter first name"
              activeLabel="First name"
              onChange={(e) => {
                formik.handleChange(e);
                setSignFirstName(e.target.value);
              }}
              value={formik.values.firstName}
              error={formik.submitCount > 0 ? formik.errors.firstName : ""}
            />
            <BaseInput
              id="lastName"
              name="lastName"
              type="text"
              label="Enter last name"
              activeLabel="Last name"
              onChange={(e) => {
                formik.handleChange(e);
                setSignLastName(e.target.value);
              }}
              value={formik.values.lastName}
              error={formik.submitCount > 0 ? formik.errors.lastName : ""}
            />
          </div>
          <EmailInput
            id="email"
            name="email"
            type="email"
            label="Enter email address"
            activeLabel="Email"
            onChange={(e) => {
              formik.handleChange(e);
              setSignUpEmail(e.target.value);
            }}
            value={formik.values.email}
            error={formik.submitCount > 0 ? formik.errors.email : ""}
          />
          <PasswordInput
            id="password"
            name="password"
            label="Enter password"
            activeLabel="Password"
            onChange={(e) => {
              formik.handleChange(e);
              setSignUpPassword(e.target.value);
            }}
            value={formik.values.password}
            error={formik.submitCount > 0 ? formik.errors.password : ""}
          />
        </div>
        <div className={styles.agreement}>
          <Checkbox
            name="agreement"
            checked={formik.values.agreement}
            onChange={(e) => {
              formik.handleChange(e);
              setAgreement(e.target.checked);
            }}
            error={formik.submitCount > 0 ? formik.errors.agreement : ""}
          >
            I agree to the <span>Terms of services and privacy policy</span>
          </Checkbox>
        </div>
        <div className={styles.buttonBlock}>
          <BaseButtonWrapper
            loading={isLoading}
            className={styles.signUpButton}
          >
            Create an account
          </BaseButtonWrapper>
          {serverError && <div className="errorMessage">{serverError}</div>}
        </div>
      </form>
    </>
  );
};
