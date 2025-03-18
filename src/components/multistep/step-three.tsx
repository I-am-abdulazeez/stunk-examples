import { useChunk } from "stunk/react";

import {
  nextStep,
  prevStep,
  updateField,
  wizardChunk,
} from "@/store/wizard-store";

export default function StepThree() {
  const [wizard, setWizard] = useChunk(wizardChunk);

  return (
    <div className="p-6 max-w-md mx-auto border border-gray-600 rounded-lg space-y-3">
      <h2 className="text-xl font-bold">Address & Age</h2>

      <label className="block text-lg text-left font-medium">Address</label>
      <input
        type="text"
        value={wizard.data.address}
        onChange={(e) =>
          setWizard((prev) => updateField(prev, { address: e.target.value }))
        }
        placeholder="123 Main St"
        className="input input-bordered w-full"
      />
      {wizard.touched.address && wizard.errors.address && (
        <p className="text-red-500 text-left">{wizard.errors.address}</p>
      )}

      <label className="block text-lg text-left font-medium">Age</label>
      <input
        type="text"
        value={wizard.data.age}
        onChange={(e) =>
          setWizard((prev) => updateField(prev, { age: e.target.value }))
        }
        placeholder="25"
        className="input input-bordered w-full"
      />
      {wizard.touched.age && wizard.errors.age && (
        <p className="text-red-500 text-left">{wizard.errors.age}</p>
      )}

      <div className="flex justify-between">
        <button onClick={prevStep} className="btn btn-secondary">
          Back
        </button>
        <button onClick={nextStep} className="btn btn-primary">
          Confirm
        </button>
      </div>
    </div>
  );
}
