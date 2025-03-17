import { WizardState } from "@/store/wizard-store";

// Validation function manually or Validation function using Zod.
export const validateStep = (state: WizardState): Partial<WizardState["errors"]> => {
  const errors: Partial<WizardState["errors"]> = {};
  if (state.step === 1) {
    if (!state.data.lastName.trim()) errors.lastName = "Last name is required";
    if (!state.data.firstName.trim()) errors.firstName = "First name is required";
  }
  if (state.step === 2) {
    if (!/\S+@\S+\.\S+/.test(state.data.email)) errors.email = "Invalid email";
    if (state.data.password.length < 6) errors.password = "Password must be at least 6 characters";
  }
  if (state.step === 3) {
    if (!state.data.address.trim()) errors.address = "Address is required";
    if (!/^\d+$/.test(state.data.age)) errors.age = "Age must be a number";
  }
  return errors;
};

// Middleware usage in Stunk
export const validationMiddleware = (state: WizardState, next: (newState: WizardState) => void) => {
  const errors = validateStep(state);
  if (Object.keys(errors).length > 0) {
    next({ ...state, errors });
  } else {
    next({ ...state, errors: {} });
  }
};
