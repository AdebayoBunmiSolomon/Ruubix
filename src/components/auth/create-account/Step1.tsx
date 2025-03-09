import {
  CustomInput,
  CustomPhoneInput,
  CustomText,
} from "@src/components/shared";
import { useEnteredPhoneNumberStore } from "@src/hooks/store";
import { colors } from "@src/resources/colors/colors";
import { moderateScale } from "@src/resources/scaling";
import { formStepperType } from "@src/types/types";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, View } from "react-native";

export const Step1: React.FC<formStepperType> = ({ useFormProps }) => {
  const { enteredPhoneNumber } = useEnteredPhoneNumberStore();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const props = useFormProps;

  useEffect(() => {
    props?.setValue("phone_number", enteredPhoneNumber);
    setPhoneNumber(enteredPhoneNumber);
  }, []);
  return (
    <>
      <Controller
        control={props?.control}
        render={({ field }) => (
          <CustomInput
            title='First name'
            titleType='nunito-bold'
            titleColor={colors.black}
            value={field.value}
            onChangeText={(text) => field.onChange(text)}
            placeholder='Enter your legal first name'
            type='custom'
            showErrorText
            error={props?.errors?.first_name?.message}
            style={styles.input}
          />
        )}
        name='first_name'
        defaultValue=''
      />

      <Controller
        control={props?.control}
        render={({ field }) => (
          <CustomInput
            title='Last name'
            titleType='nunito-bold'
            titleColor={colors.black}
            value={field.value}
            onChangeText={(text) => field.onChange(text)}
            placeholder='Enter your legal last name'
            type='custom'
            showErrorText
            error={props?.errors?.last_name?.message}
            style={styles.input}
          />
        )}
        name='last_name'
        defaultValue=''
      />

      <Controller
        control={props?.control}
        render={({ field }) => (
          <CustomInput
            title='Email address'
            titleType='nunito-bold'
            titleColor={colors.black}
            value={field.value}
            onChangeText={(text) => field.onChange(text)}
            placeholder='Enter your email address'
            type='custom'
            showErrorText
            error={props?.errors?.email_address?.message}
            style={styles.input}
          />
        )}
        name='email_address'
        defaultValue=''
      />

      <CustomPhoneInput
        value={phoneNumber}
        titleColor={colors.black}
        title='Enter your phone number'
        titleType='nunito-bold'
        onChangeText={(value) => {}}
        style={styles.input}
        showErrorText
        error={props?.errors?.phone_number?.message}
      />

      <Controller
        control={props?.control}
        render={({ field }) => (
          <CustomInput
            title='Email address'
            titleType='nunito-bold'
            titleColor={colors.black}
            value={field.value}
            placeholder='Select option'
            type='dropdown'
            showErrorText
            error={props?.errors?.gender?.message}
            style={styles.input}
            dropDownItems={["Male", "Female"]}
            onSelectDropDownItem={(value) => field.onChange(value)}
          />
        )}
        name='gender'
        defaultValue=''
      />

      <View style={styles.dobMainContainer}>
        <CustomText
          type='nunito-bold'
          size={13}
          black
          style={{
            marginBottom: moderateScale(-20),
          }}>
          Date of Birth
        </CustomText>
        <View style={styles.dobContainer}>
          <View style={styles.dobInputContainer}>
            <Controller
              control={props?.control}
              render={({ field }) => (
                <CustomInput
                  titleType='nunito-bold'
                  titleColor={colors.black}
                  value={field.value}
                  onChangeText={(text) => field.onChange(text)}
                  placeholder='DD'
                  type='custom'
                  showErrorText
                  error={props?.errors?.date?.message}
                  style={styles.input}
                  inputStyle={styles.inputStyle}
                  maxLength={2}
                  keyboardType='phone-pad'
                />
              )}
              name='date'
              defaultValue=''
            />
          </View>

          <View style={styles.dobInputContainer}>
            <Controller
              control={props?.control}
              render={({ field }) => (
                <CustomInput
                  titleType='nunito-bold'
                  titleColor={colors.black}
                  value={field.value}
                  onChangeText={(text) => field.onChange(text)}
                  placeholder='MM'
                  type='custom'
                  showErrorText
                  error={props?.errors?.month?.message}
                  style={styles.input}
                  inputStyle={styles.inputStyle}
                  maxLength={2}
                  keyboardType='phone-pad'
                />
              )}
              name='month'
              defaultValue=''
            />
          </View>

          <View style={styles.dobInputContainer}>
            <Controller
              control={props?.control}
              render={({ field }) => (
                <CustomInput
                  titleType='nunito-bold'
                  titleColor={colors.black}
                  value={field.value}
                  onChangeText={(text) => field.onChange(text)}
                  placeholder='YYY'
                  type='custom'
                  showErrorText
                  error={props?.errors?.year?.message}
                  style={styles.input}
                  inputStyle={styles.inputStyle}
                  maxLength={4}
                  keyboardType='phone-pad'
                />
              )}
              name='year'
              defaultValue=''
            />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.white,
  },
  dobMainContainer: {
    gap: moderateScale(2),
  },
  dobContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dobInputContainer: {
    width: "30%",
  },
  inputStyle: {
    textAlign: "center",
  },
});
