import { yupResolver } from "@hookform/resolvers/yup";
import { AppHeader } from "@src/common";
import { Step1, Step2, Step3 } from "@src/components/auth/create-account";
import { InfoCard } from "@src/components/auth/sign-up";
import { CustomButton } from "@src/components/shared";
import {
  createAccountStep1FormTypes,
  createAccountStep2FormTypes,
  createAccountStep3FormTypes,
} from "@src/form/schema/types";
import {
  createAccountStep1ValidationSchema,
  createAccountStep2ValidationSchema,
  createAccountStep3ValidationSchema,
} from "@src/form/validation/rules";
import { useStepper } from "@src/hooks/services";
import { authScreenNames } from "@src/navigation";
import { colors } from "@src/resources/colors/colors";
import { moderateScale } from "@src/resources/scaling";
import { AuthScreenProps } from "@src/router/types";
import { Screen } from "@src/screens/Screen";
import { ScrollContainer } from "@src/screens/Scroll-Container";
import React from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

export const CreateAccount = ({
  navigation,
}: AuthScreenProps<authScreenNames.CREATE_ACCOUNT>) => {
  const { nextStep, currStep, prevStep } = useStepper(3);

  //form 1 validation control
  const {
    control: step1FormControl,
    formState: { errors: step1FormErrors },
    trigger: step1FormTrigger,
    setValue: step1FormSetValue,
    getValues: step1FormGetValues,
    clearErrors: step1FormClearError,
  } = useForm<createAccountStep1FormTypes>({
    mode: "onChange",
    resolver: yupResolver(createAccountStep1ValidationSchema),
  });

  //form 2 validation control
  const {
    control: step2FormControl,
    formState: { errors: step2FormErrors },
    trigger: step2FormTrigger,
    setValue: step2FormSetValue,
    getValues: step2FormGetValues,
    clearErrors: step2FormClearError,
  } = useForm<createAccountStep2FormTypes>({
    mode: "onChange",
    resolver: yupResolver(createAccountStep2ValidationSchema),
  });

  //form 3 validation control
  const {
    control: step3FormControl,
    formState: { errors: step3FormErrors },
    trigger: step3FormTrigger,
    setValue: step3FormSetValue,
    getValues: step3FormGetValues,
    clearErrors: step3FormClearError,
  } = useForm<createAccountStep3FormTypes>({
    mode: "onChange",
    resolver: yupResolver(createAccountStep3ValidationSchema),
  });

  const onSubmit = async () => {
    let isValid = false;
    if (currStep === 1) {
      isValid = await step1FormTrigger();
      if (isValid) nextStep();
    } else if (currStep === 2) {
      isValid = await step2FormTrigger();
      if (isValid) nextStep();
    } else if (currStep === 3) {
      isValid = await step3FormTrigger();
      if (isValid) {
        navigation.navigate(authScreenNames.CREATE_ACCOUNT_SUCCESS);
      }
    }
  };

  //form steps
  const steps = [
    <Step1
      useFormProps={{
        control: step1FormControl,
        errors: step1FormErrors,
        setValue: step1FormSetValue,
        clearErrors: step1FormClearError,
      }}
    />,
    <Step2
      useFormProps={{
        control: step2FormControl,
        errors: step2FormErrors,
        setValue: step2FormSetValue,
        clearErrors: step2FormClearError,
      }}
    />,
    <Step3
      useFormProps={{
        control: step3FormControl,
        errors: step3FormErrors,
        setValue: step3FormSetValue,
        clearErrors: step3FormClearError,
      }}
    />,
  ];

  const renderInfoCardText = () => {
    if (currStep === 1) {
      return {
        text: "Basic Information: Kindly provide accurate information, double check before submitting",
      };
    } else if (currStep === 2) {
      return {
        text: "Address Information: Kindly provide accurate information, double check before submitting",
      };
    } else if (currStep === 3) {
      return {
        text: "Identification: Kindly upload all required document to complete your account set up",
      };
    }
  };

  return (
    <Screen style={styles.screen}>
      <AppHeader
        title='Create your account'
        showGetHelp
        onPressArrowBack={() => {
          if (currStep === 1) {
            navigation.goBack();
          } else {
            prevStep();
          }
        }}
        showProgress
        currStep={currStep}
        totalStep={3}
      />
      <InfoCard text={String(renderInfoCardText()?.text)} />
      <View
        style={{
          flex: 1,
        }}>
        <ScrollContainer style={styles.scrollContainer}>
          {steps[currStep - 1]}
          <CustomButton
            title='Continue'
            textType='nunito-semibold'
            textSize={16}
            onPress={async () => await onSubmit()}
            buttonType='Solid'
            bgBlack
            textWhite
            style={styles.continueBtn}
            isLoading={false}
            loaderColor={colors.white}
          />
        </ScrollContainer>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.white,
    paddingHorizontal: moderateScale(10),
  },
  scrollContainer: {
    gap: moderateScale(20),
  },
  continueBtn: {
    marginBottom: moderateScale(20),
    paddingVertical: moderateScale(15),
    width: "100%",
    marginTop: moderateScale(70),
  },
});
