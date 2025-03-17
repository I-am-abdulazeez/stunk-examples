import { useChunk } from "stunk/react";

import {
  nextStep,
  prevStep,
  updateField,
  wizardChunk,
} from "@/store/wizard-store";

export default function StepTwo() {
  const [wizard, setWizard] = useChunk(wizardChunk);

  return (
    <div className="p-6 max-w-md mx-auto border border-gray-600 rounded-lg space-y-3">
      <h2 className="text-xl font-bold">Account Details</h2>
      <label className="block text-lg text-left font-medium">Email</label>
      <input
        type="email"
        value={wizard.data.email}
        onChange={(e) =>
          setWizard((prev) => updateField(prev, { email: e.target.value }))
        }
        placeholder="olamide@mail.com"
        className="input input-bordered w-full"
      />
      {wizard.touched.email && wizard.errors.email && (
        <p className="text-red-500 text-left">{wizard.errors.email}</p>
      )}

      <label className="block text-lg text-left font-medium">Password</label>
      <input
        type="password"
        value={wizard.data.password}
        onChange={(e) =>
          setWizard((prev) => updateField(prev, { password: e.target.value }))
        }
        placeholder="********"
        className="input input-bordered w-full"
      />
      {wizard.touched.password && wizard.errors.password && (
        <p className="text-red-500 text-left">{wizard.errors.password}</p>
      )}

      <div className="flex justify-between">
        <button onClick={prevStep} className="btn btn-secondary">
          Back
        </button>
        <button onClick={nextStep} className="btn btn-primary">
          Next
        </button>
      </div>
    </div>
  );
}
