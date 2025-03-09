import { UploadButton } from "@src/components/shared";
import { formStepperType } from "@src/types/types";
import React from "react";

export const Step3: React.FC<formStepperType> = ({ useFormProps }) => {
  const props = useFormProps;
  return (
    <>
      <UploadButton
        title='Proof of Identity'
        btnTitle='Tap to Upload'
        btnDesc={
          "A passport, drivers license, or any other government-\nissued ID"
        }
        upload={() => {}}
      />

      <UploadButton
        title='Proof of Address'
        btnTitle='Tap to Upload'
        btnDesc={
          "A utility bill, rent bill, tax bill, mortgage statement, or\nother official document"
        }
        upload={() => {}}
      />

      <UploadButton
        title='Face Verification'
        btnTitle='Tap to Verify'
        btnDesc={
          "Take a selfie to verify your identity, Position your face\nwithin the photo frame to take a shot"
        }
        btnIconSrc={require("@src/assets/png/Camera.png")}
        upload={() => {}}
      />
    </>
  );
};
