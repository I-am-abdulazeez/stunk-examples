import { useChunk } from "stunk/react";

import GoBack from "@/components/shared/go-back";
import Heading from "@/components/shared/heading";

import StepOne from "@/components/multistep/step-one";
import StepTwo from "@/components/multistep/step-two";
import StepThree from "@/components/multistep/step-three";
import Summary from "@/components/multistep/summary";

import { wizardChunk } from "@/store/wizard-store";

export default function MultiStepWizard() {
  const [wizard] = useChunk(wizardChunk);

  const steps = [
    { num: 1, label: "Personal" },
    { num: 2, label: "Account" },
    { num: 3, label: "Address" },
    { num: 4, label: "Summary" },
  ];

  return (
    <div className="min-h-screen bg-base-100 p-4">
      <div className="container mx-auto max-w-xl">
        <Heading text="Multi-Step Wizard" />

        {/* Progress Stepper */}
        <div className="card bg-base-200 border border-base-300 mb-6">
          <div className="card-body p-6">
            <ul className="steps steps-horizontal w-full">
              {steps.map((step) => (
                <li
                  key={step.num}
                  className={`step ${
                    wizard.step >= step.num ? "step-primary" : ""
                  }`}
                  data-content={wizard.step > step.num ? "✓" : step.num}
                >
                  <span className="hidden sm:inline">{step.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Step Content */}
        {wizard.step === 1 && <StepOne />}
        {wizard.step === 2 && <StepTwo />}
        {wizard.step === 3 && <StepThree />}
        {wizard.step === 4 && <Summary />}

        <div className="mt-6">
          <GoBack />
        </div>
      </div>
    </div>
  );
}
