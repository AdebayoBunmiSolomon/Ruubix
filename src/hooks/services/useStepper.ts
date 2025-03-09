import { useState } from "react";

export const useStepper = (stepLength: number) => {
  const [currStep, setCurrStep] = useState<number>(1);

  const nextStep = () => {
    if (currStep < stepLength) {
      setCurrStep(currStep + 1);
    } else if (currStep === stepLength) {
      //nothing happens
    }
  };

  const prevStep = () => {
    if (currStep >= stepLength || currStep <= stepLength) {
      setCurrStep(currStep - 1);
    } else if (currStep === 1) {
      //nothing happens
    }
  };

  return {
    nextStep,
    prevStep,
    currStep,
  };
};
