import { useChunk } from "stunk/react";

import { prevStep, reset, wizardChunk } from "@/store/wizard-store";

export default function Summary() {
  const [wizard] = useChunk(wizardChunk);

  const handleSubmit = () => {
    if (Object.keys(wizard.errors).length > 0) return;
    alert(
      `Form submitted successfully!, ${JSON.stringify(
        wizardChunk.get().data,
        null,
        2
      )}`
    );
  };

  return (
    <div className="p-6 max-w-md mx-auto border border-gray-600 rounded-lg space-y-3">
      <h2 className="text-xl font-bold">Summary</h2>
      <div className="text-left">
        <p>
          <strong>Full name: </strong>
          {`${wizard.data.firstName} ${wizard.data.lastName}`}
        </p>
        <p>
          <strong>Email:</strong> {wizard.data.email}
        </p>
        <p>
          <strong>Email:</strong> {wizard.data.email}
        </p>
        <p>
          <strong>Address:</strong> {wizard.data.address}
        </p>
        <p>
          <strong>Age:</strong> {wizard.data.age}
        </p>
      </div>
      <div className="flex justify-between">
        <button onClick={prevStep} className="btn btn-outline">
          Back
        </button>
        <button onClick={reset} className="btn btn-warning">
          Reset
        </button>
        <button className="btn btn-success shadow-none" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}
