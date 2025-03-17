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

  return (
    <>
      <Heading text={"MultiStep Wizard"} />
      {wizard.step === 1 && <StepOne />}
      {wizard.step === 2 && <StepTwo />}
      {wizard.step === 3 && <StepThree />}
      {wizard.step === 4 && <Summary />}
      <GoBack />
    </>
  );
}
