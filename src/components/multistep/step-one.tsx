import { useChunk } from "stunk/react";
import { User, ChevronRight, AlertCircle } from "lucide-react";

import { nextStep, updateField, wizardChunk } from "@/store/wizard-store";

export default function StepOne() {
  const [wizard, setWizard] = useChunk(wizardChunk);

  return (
    <div className="card bg-base-200 border border-base-300">
      <div className="card-body p-8">
        <h2 className="card-title text-2xl mb-6 flex items-center gap-2">
          <User className="w-6 h-6 text-[#2af4c2]" />
          Personal Information
        </h2>

        <div className="space-y-4">
          <div className="form-control text-left">
            <div className="mb-2">
              <span className="font-semibold">First Name</span>
            </div>
            <input
              type="text"
              value={wizard.data.firstName}
              onChange={(e) =>
                setWizard((prev) =>
                  updateField(prev, { firstName: e.target.value })
                )
              }
              placeholder="Enter your first name"
              className={`input input-bordered w-full ${
                wizard.touched.firstName && wizard.errors.firstName
                  ? "input-error"
                  : ""
              }`}
            />
            {wizard.touched.firstName && wizard.errors.firstName && (
              <label className="label">
                <span className="label-text-alt text-error flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {wizard.errors.firstName}
                </span>
              </label>
            )}
          </div>

          <div className="form-control text-left">
            <div className="mb-2">
              <span className="font-semibold">Last Name</span>
            </div>
            <input
              type="text"
              value={wizard.data.lastName}
              onChange={(e) =>
                setWizard((prev) =>
                  updateField(prev, { lastName: e.target.value })
                )
              }
              placeholder="Enter your last name"
              className={`input input-bordered w-full ${
                wizard.touched.lastName && wizard.errors.lastName
                  ? "input-error"
                  : ""
              }`}
            />
            {wizard.touched.lastName && wizard.errors.lastName && (
              <label className="label">
                <span className="label-text-alt text-error flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {wizard.errors.lastName}
                </span>
              </label>
            )}
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={nextStep}
            className="btn bg-[#2af4c2] hover:bg-[#24d4a8] border-none text-neutral-900 font-semibold gap-2"
          >
            Next Step
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
