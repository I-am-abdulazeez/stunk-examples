import { useChunk } from "stunk/react";
import { CheckCircle2, ChevronLeft, RotateCcw, Send } from "lucide-react";

import { prevStep, reset, wizardChunk } from "@/store/wizard-store";

export default function Summary() {
  const [wizard] = useChunk(wizardChunk);

  const handleSubmit = () => {
    if (Object.keys(wizard.errors).length > 0) return;
    alert(
      `Form submitted successfully!\n\n${JSON.stringify(
        wizardChunk.get().data,
        null,
        2
      )}`
    );
  };

  return (
    <div className="card bg-base-200 border border-base-300">
      <div className="card-body p-8">
        <h2 className="card-title text-2xl mb-6 flex items-center gap-2">
          <CheckCircle2 className="w-6 h-6 text-[#2af4c2]" />
          Review Your Information
        </h2>

        <div className="card bg-base-100 border border-base-300">
          <div className="card-body p-6">
            <div className="space-y-4">
              <div>
                <div className="text-sm opacity-60 mb-1">Full Name</div>
                <div className="font-semibold text-lg">
                  {wizard.data.firstName} {wizard.data.lastName}
                </div>
              </div>

              <div className="divider my-2"></div>

              <div>
                <div className="text-sm opacity-60 mb-1">Email Address</div>
                <div className="font-semibold">{wizard.data.email}</div>
              </div>

              <div className="divider my-2"></div>

              <div>
                <div className="text-sm opacity-60 mb-1">Address</div>
                <div className="font-semibold">{wizard.data.address}</div>
              </div>

              <div className="divider my-2"></div>

              <div>
                <div className="text-sm opacity-60 mb-1">Age</div>
                <div className="font-semibold">{wizard.data.age}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="alert mt-6">
          <CheckCircle2 className="w-5 h-5 text-[#2af4c2] flex-shrink-0" />
          <div className="text-sm">
            <p className="font-semibold">Ready to Submit</p>
            <p className="opacity-70">
              Please review your information before submitting
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-6">
          <button onClick={prevStep} className="btn btn-outline gap-2">
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
          <button onClick={reset} className="btn btn-warning gap-2">
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <button className="btn btn-success gap-2" onClick={handleSubmit}>
            <Send className="w-4 h-4" />
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
