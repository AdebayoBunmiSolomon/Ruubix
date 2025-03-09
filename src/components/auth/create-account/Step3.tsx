import { UploadButton } from "@src/components/shared";
import { useMedia } from "@src/hooks/services";
import { formStepperType } from "@src/types/types";
import React from "react";

export const Step3: React.FC<formStepperType> = ({ useFormProps }) => {
  const { openCamera, openGallery } = useMedia();
  const props = useFormProps;
  return (
    <>
      <UploadButton
        title='Proof of Identity'
        btnTitle='Tap to Upload'
        btnDesc={
          "A passport, drivers license, or any other government-\nissued ID"
        }
        upload={async () => {
          const result = await openGallery();
          if (result) {
            props?.setValue("proof_of_identity", String(result?.uri));
            props?.clearErrors("proof_of_identity");
          }
        }}
        showErrorText
        error={props?.errors?.proof_of_identity?.message}
      />

      <UploadButton
        title='Proof of Address'
        btnTitle='Tap to Upload'
        btnDesc={
          "A utility bill, rent bill, tax bill, mortgage statement, or\nother official document"
        }
        upload={async () => {
          const result = await openGallery();
          if (result) {
            props?.setValue("proof_of_address", String(result?.uri));
            props?.clearErrors("proof_of_address");
          }
        }}
        showErrorText
        error={props?.errors?.proof_of_address?.message}
      />

      <UploadButton
        title='Face Verification'
        btnTitle='Tap to Verify'
        btnDesc={
          "Take a selfie to verify your identity, Position your face\nwithin the photo frame to take a shot"
        }
        btnIconSrc={require("@src/assets/png/Camera.png")}
        upload={async () => {
          const result = await openCamera();
          if (result) {
            props?.setValue("face_verification", String(result?.uri));
            props?.clearErrors("face_verification");
          }
        }}
        showErrorText
        error={props?.errors?.face_verification?.message}
      />
    </>
  );
};
