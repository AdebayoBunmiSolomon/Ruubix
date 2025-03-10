import { UploadButton } from "@src/components/shared";
import { useMedia } from "@src/hooks/services";
import { formStepperType } from "@src/types/types";
import React, { useState } from "react";

type uploadedFiles = {
  proof_of_identity?: any;
  proof_of_address?: any;
  face_verification?: any;
};

export const Step3: React.FC<formStepperType> = ({ useFormProps }) => {
  const { openCamera, openGallery } = useMedia();
  const [uploadedFile, setUploadedFile] = useState<uploadedFiles>({
    proof_of_address: undefined,
    proof_of_identity: undefined,
    face_verification: undefined,
  });
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
            setUploadedFile({
              ...uploadedFile,
              proof_of_identity: result?.uri,
            });
          }
        }}
        showErrorText
        error={props?.errors?.proof_of_identity?.message}
        uploadedImg={uploadedFile.proof_of_identity}
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
            setUploadedFile({
              ...uploadedFile,
              proof_of_address: result?.uri,
            });
          }
        }}
        showErrorText
        error={props?.errors?.proof_of_address?.message}
        uploadedImg={uploadedFile.proof_of_address}
      />

      <UploadButton
        title='Face Verification'
        btnTitle='Tap to Verify'
        btnDesc={
          "Take a selfie to verify your identity, Position your face\nwithin the photo frame to take a shot"
        }
        btnIconSrc={require("@src/assets/png/Camera.png")}
        uploadedImg={uploadedFile?.face_verification}
        upload={async () => {
          const result = await openCamera();
          if (result) {
            props?.setValue("face_verification", String(result?.uri));
            props?.clearErrors("face_verification");
            setUploadedFile({
              ...uploadedFile,
              face_verification: result?.uri,
            });
          }
        }}
        showErrorText
        error={props?.errors?.face_verification?.message}
      />
    </>
  );
};
