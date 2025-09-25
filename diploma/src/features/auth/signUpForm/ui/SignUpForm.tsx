import styles from "./SignUpForm.module.scss";
import { DefaultInput } from "../../../../shared/inputs";
import { Checkbox } from "../../../../shared/checkBox";
import { AuthButton } from "../../../../shared/buttons/auth";
import { useRegistration } from "../model/useRegistration";
import { useAuthFormStore } from "../../../../entities/user";

export const SignUpForm = () => {
  const { formik, isLoading } = useRegistration();
  const { setRegisterEmail, setFirstName, setLastName, setAgreement } =
    useAuthFormStore();
  return (
    <>
      <div className={styles.headerSignUp}>
        <h1>Create an account</h1>
      </div>
      <form onSubmit={formik.handleSubmit} className={styles.signUpForm}>
        <div className={styles.inputsSignUp}>
          <div className={styles.inputsFullName}>
            <DefaultInput
              id="firstName"
              name="firstName"
              type="text"
              label="Enter first name"
              activeLabel="First name"
              onChange={(e) => {
                formik.handleChange(e);
                setFirstName(e.target.value);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              error={formik.submitCount > 0 ? formik.errors.firstName : ""}
            />
            <DefaultInput
              id="lastName"
              name="lastName"
              type="text"
              label="Enter last name"
              activeLabel="Last name"
              onChange={(e) => {
                formik.handleChange(e);
                setLastName(e.target.value);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
              error={formik.submitCount > 0 ? formik.errors.lastName : ""}
            />
          </div>
          <DefaultInput
            id="email"
            name="registerEmail"
            type="email"
            label="Enter email address"
            activeLabel="Email"
            onChange={(e) => {
              formik.handleChange(e);
              setRegisterEmail(e.target.value);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.registerEmail}
            error={formik.submitCount > 0 ? formik.errors.registerEmail : ""}
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
          <AuthButton label="Create an account" loading={isLoading} />
        </div>
      </form>
    </>
  );
};
