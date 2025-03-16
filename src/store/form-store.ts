import { chunk } from "stunk";

export const formChunk = chunk({
  name: "",
  email: "",
  password: "",
  errors: {} as Record<string, string>,
});

export const updateField = (field: string, value: string) => {
  formChunk.set((prev) => ({
    ...prev,
    [field]: value,
    errors: { ...prev.errors, [field]: "" },
  }));
};

export const validateForm = () => {
  const { name, email, password } = formChunk.get();
  const errors: Record<string, string> = {};

  if (!name.trim()) errors.name = "Name is required";
  if (!email.includes("@")) errors.email = "Invalid email";
  if (password.length < 6) errors.password = "Password must be at least 6 characters";

  formChunk.set((prev) => ({ ...prev, errors }));

  return Object.keys(errors).length === 0;
};

export const submitForm = () => {
  if (validateForm()) {
    console.log("Form submitted:", formChunk.get());
    alert(`"Form submitted:", ${JSON.stringify(formChunk.get(), null, 2)}`)
  }
};

export const resetForm = () => {
  formChunk.reset()
}
