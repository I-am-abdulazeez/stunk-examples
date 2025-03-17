import { useChunk } from "stunk/react";

import { nextStep, updateField, wizardChunk } from "@/store/wizard-store";

export default function StepOne() {
  const [wizard, setWizard] = useChunk(wizardChunk);

  return (
    <div className="p-6 max-w-md mx-auto border border-gray-600 rounded-lg space-y-3">
      <h2 className="text-xl font-bold">Personal Info</h2>
      <label className="block text-lg text-left font-medium">First Name</label>
      <input
        type="text"
        value={wizard.data.firstName}
        onChange={(e) =>
          setWizard((prev) => updateField(prev, { firstName: e.target.value }))
        }
        placeholder="AbdulAzeez"
        className="input input-bordered w-full"
      />
      {wizard.touched.firstName && wizard.errors.firstName && (
        <p className="text-red-500 text-left">{wizard.errors.firstName}</p>
      )}

      <label className="block text-lg text-left font-medium">Last Name</label>
      <input
        type="text"
        value={wizard.data.lastName}
        onChange={(e) =>
          setWizard((prev) => updateField(prev, { lastName: e.target.value }))
        }
        placeholder="Olanrewaju"
        className="input input-bordered w-full"
      />
      {wizard.touched.lastName && wizard.errors.lastName && (
        <p className="text-red-500 text-left">{wizard.errors.lastName}</p>
      )}

      <div className="text-right">
        <button onClick={nextStep} className="btn btn-primary">
          Next
        </button>
      </div>
    </div>
  );
}
