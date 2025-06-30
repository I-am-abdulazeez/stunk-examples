import { chunk } from "stunk";
import { withPersistence } from "stunk/middleware";

import { validateStep, validationMiddleware } from "@/middleware/validators";

export type WizardState = {
  step: number,
  data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address: string;
    age: string;
  }
  errors: Partial<Record<keyof WizardState["data"], string>>;
  touched: Partial<Record<keyof WizardState["data"], boolean>>;

};

const wizard = chunk<WizardState>({
  step: 1,
  data: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    age: "",
  },
  errors: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    age: "",
  },
  touched: {}

}, [validationMiddleware]);

export const wizardChunk = withPersistence(wizard, { key: 'form-wizard' })

export const updateField = (
  prev: WizardState,
  updates: Partial<WizardState["data"]>
): WizardState => {
  const field = Object.keys(updates)[0] as keyof WizardState["data"];

  return {
    ...prev,
    data: { ...prev.data, ...updates },
    errors: validateStep({ ...prev, data: { ...prev.data, ...updates } }),
    touched: { ...prev.touched, [field]: true },
  };
}

export const nextStep = () => {
  wizardChunk.set((prev) => {
    const errors = validateStep(prev);
    const touchedFields = Object.keys(errors).reduce((acc, key) => {
      acc[key as keyof WizardState["data"]] = true;
      return acc;
    }, {} as Partial<Record<keyof WizardState["data"], boolean>>);

    if (Object.keys(errors).length > 0) {
      return { ...prev, errors, touched: { ...prev.touched, ...touchedFields } };
    }

    return { ...prev, step: prev.step + 1, errors: {} };
  });
};


export const prevStep = () => {
  wizardChunk.set((prev) => ({ ...prev, step: prev.step - 1 }));
};

export const reset = () => {
  wizardChunk.reset()
}
