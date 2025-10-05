import { useChunk } from "stunk/react";
import {
  MapPin,
  Calendar,
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import {
  nextStep,
  prevStep,
  updateField,
  wizardChunk,
} from "@/store/wizard-store";

export default function StepThree() {
  const [wizard, setWizard] = useChunk(wizardChunk);

  return (
    <div className="card bg-base-200 border border-base-300">
      <div className="card-body p-8">
        <h2 className="card-title text-2xl mb-6 flex items-center gap-2">
          <MapPin className="w-6 h-6 text-[#2af4c2]" />
          Address & Age
        </h2>

        <div className="space-y-4">
          <div className="form-control text-left">
            <div className="mb-2">
              <span className="font-semibold flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#2af4c2]" />
                Address
              </span>
            </div>
            <input
              type="text"
              value={wizard.data.address}
              onChange={(e) =>
                setWizard((prev) =>
                  updateField(prev, { address: e.target.value })
                )
              }
              placeholder="123 Main Street"
              className={`input input-bordered w-full ${
                wizard.touched.address && wizard.errors.address
                  ? "input-error"
                  : ""
              }`}
            />
            {wizard.touched.address && wizard.errors.address && (
              <label className="label">
                <span className="label-text-alt text-error flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {wizard.errors.address}
                </span>
              </label>
            )}
          </div>

          <div className="form-control text-left">
            <div className="mb-2">
              <span className="font-semibold flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#2af4c2]" />
                Age
              </span>
            </div>
            <input
              type="text"
              value={wizard.data.age}
              onChange={(e) =>
                setWizard((prev) => updateField(prev, { age: e.target.value }))
              }
              placeholder="25"
              className={`input input-bordered w-full ${
                wizard.touched.age && wizard.errors.age ? "input-error" : ""
              }`}
            />
            {wizard.touched.age && wizard.errors.age && (
              <label className="label">
                <span className="label-text-alt text-error flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {wizard.errors.age}
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
            Review
            <CheckCircle2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
