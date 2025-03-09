import { CustomInput } from "@src/components/shared";
import { countries } from "@src/constants/countries";
import { colors } from "@src/resources/colors/colors";
import { formStepperType } from "@src/types/types";
import React from "react";
import { Controller } from "react-hook-form";
import { StyleSheet } from "react-native";

export const Step2: React.FC<formStepperType> = ({ useFormProps }) => {
  const props = useFormProps;
  return (
    <>
      <Controller
        control={props?.control}
        render={({ field }) => (
          <CustomInput
            title='Country of Residence'
            titleType='nunito-bold'
            titleColor={colors.black}
            value={field.value}
            placeholder='United Kingdom'
            type='dropdown'
            showErrorText
            error={props?.errors?.country_of_residence?.message}
            style={styles.input}
            dropDownItems={
              countries && countries.map((item) => `${item.flag} ${item.name}`)
            }
            onSelectDropDownItem={(value) => field.onChange(value)}
          />
        )}
        name='country_of_residence'
        defaultValue=''
      />

      <Controller
        control={props?.control}
        render={({ field }) => (
          <CustomInput
            title='State/Province'
            titleType='nunito-bold'
            titleColor={colors.black}
            value={field.value}
            placeholder='Select Option'
            type='dropdown'
            showErrorText
            error={props?.errors?.state_or_province?.message}
            style={styles.input}
            dropDownItems={[
              "Lagos",
              "Kwara",
              "Oyo",
              "Rivers",
              "Abuja",
              "Texas",
            ]}
            onSelectDropDownItem={(value) => field.onChange(value)}
          />
        )}
        name='state_or_province'
        defaultValue=''
      />

      <Controller
        control={props?.control}
        render={({ field }) => (
          <CustomInput
            title='City'
            titleType='nunito-bold'
            titleColor={colors.black}
            value={field.value}
            placeholder='Select Option'
            type='dropdown'
            showErrorText
            error={props?.errors?.city?.message}
            style={styles.input}
            dropDownItems={[
              "Ikeja",
              "Ilorin",
              "Ibadan",
              "Port Haccourt",
              "Gwagwalada",
              "Owerri",
            ]}
            onSelectDropDownItem={(value) => field.onChange(value)}
          />
        )}
        name='city'
        defaultValue=''
      />

      <Controller
        control={props?.control}
        render={({ field }) => (
          <CustomInput
            title='Residential Address'
            titleType='nunito-bold'
            titleColor={colors.black}
            value={field.value}
            onChangeText={(text) => field.onChange(text)}
            placeholder='Enter your residential address'
            type='custom'
            showErrorText
            error={props?.errors?.residential_address?.message}
            style={styles.input}
          />
        )}
        name='residential_address'
        defaultValue=''
      />

      <Controller
        control={props?.control}
        render={({ field }) => (
          <CustomInput
            title='Postal/Zip Code'
            titleType='nunito-bold'
            titleColor={colors.black}
            value={field.value}
            onChangeText={(text) => field.onChange(text)}
            placeholder='E.g. SW1W 0NY'
            type='custom'
            showErrorText
            error={props?.errors?.postal_or_zip_code?.message}
            style={styles.input}
          />
        )}
        name='postal_or_zip_code'
        defaultValue=''
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.white,
  },
});
