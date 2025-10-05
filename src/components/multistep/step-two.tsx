import { useChunk } from "stunk/react";
import {
  Mail,
  Lock,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react";

import {
  nextStep,
  prevStep,
  updateField,
  wizardChunk,
} from "@/store/wizard-store";

export default function StepTwo() {
  const [wizard, setWizard] = useChunk(wizardChunk);

  return (
    <div className="card bg-base-200 border border-base-300">
      <div className="card-body p-8">
        <h2 className="card-title text-2xl mb-6 flex items-center gap-2">
          <Lock className="w-6 h-6 text-[#2af4c2]" />
          Account Details
        </h2>

        <div className="space-y-4">
          <div className="form-control text-left">
            <div className="mb-2">
              <span className="font-semibold flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#2af4c2]" />
                Email Address
              </span>
            </div>
            <input
              type="email"
              value={wizard.data.email}
              onChange={(e) =>
                setWizard((prev) =>
                  updateField(prev, { email: e.target.value })
                )
              }
              placeholder="your.email@example.com"
              className={`input input-bordered w-full ${
                wizard.touched.email && wizard.errors.email ? "input-error" : ""
              }`}
            />
            {wizard.touched.email && wizard.errors.email && (
              <label className="label">
                <span className="label-text-alt text-error flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {wizard.errors.email}
                </span>
              </label>
            )}
          </div>

          <div className="form-control text-left">
            <div className="mb-2">
              <span className="font-semibold flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#2af4c2]" />
                Password
              </span>
            </div>
            <input
              type="password"
              value={wizard.data.password}
              onChange={(e) =>
                setWizard((prev) =>
                  updateField(prev, { password: e.target.value })
                )
              }
              placeholder="Create a strong password"
              className={`input input-bordered w-full ${
                wizard.touched.password && wizard.errors.password
                  ? "input-error"
                  : ""
              }`}
            />
            {wizard.touched.password && wizard.errors.password && (
              <label className="label">
                <span className="label-text-alt text-error flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {wizard.errors.password}
                </span>
              </label>
            )}
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button onClick={prevStep} className="btn btn-outline gap-2">
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
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
