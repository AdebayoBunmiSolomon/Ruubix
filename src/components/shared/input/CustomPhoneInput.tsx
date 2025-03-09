import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ColorValue,
} from "react-native";
import PhoneInput from "react-native-phone-input";
import { CustomText } from "../text/CustomText";
import { DVH, DVW, moderateScale } from "@src/resources/scaling";
import { colors } from "@src/resources/colors/colors";
import { fontFamily } from "@src/resources/fonts/font-family";
import { textType } from "../text/CustomText";

interface ICustomPhoneInputProps {
  title?: string;
  titleType?: textType;
  titleColor?: ColorValue;
  value: string;
  onChangeText: (value: string) => void;
  error?: string;
  showErrorText?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const CustomPhoneInput: React.FC<ICustomPhoneInputProps> = ({
  title,
  titleType,
  titleColor,
  value,
  onChangeText,
  error,
  showErrorText,
  style,
}) => {
  const phoneInputRef = useRef<PhoneInput>(null);

  const getBorderColor = () => (error ? colors.danger : "#d3cacaf5");

  return (
    <View style={styles.container}>
      <CustomText
        size={14}
        type={titleType ? titleType : "nunito-medium"}
        style={[
          {
            color: titleColor,
          },
          styles.title,
        ]}>
        {title ? title : "Phone number"}
      </CustomText>
      <View
        style={[styles.inputWrapper, { borderColor: getBorderColor() }, style]}>
        <PhoneInput
          ref={phoneInputRef}
          allowZeroAfterCountryCode={false}
          onChangePhoneNumber={onChangeText}
          style={styles.phoneInput}
          textStyle={styles.phoneInputText}
          flagStyle={styles.flagStyle}
          autoFormat
          pickerButtonColor={colors.darkGrey}
          initialCountry='ng'
          textProps={{
            placeholder: "Enter your phone number",
            placeholderTextColor: colors.darkGrey,
          }}
          initialValue={value}
        />
      </View>
      {showErrorText && error && (
        <CustomText size={12} type='nunito-regular' style={styles.errorText}>
          {error}
        </CustomText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: moderateScale(5),
  },
  title: {
    color: "#484848",
  },
  inputWrapper: {
    height: DVH(7),
    borderWidth: DVW(0.2),
    backgroundColor: "#F5F5F5",
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  phoneInput: {
    flex: 1,
    height: "100%",
  },
  phoneInputText: {
    fontFamily: fontFamily.nunito_regular,
    fontSize: moderateScale(14),
    color: colors.black,
  },
  flagStyle: {
    marginHorizontal: moderateScale(10),
    width: DVW(10),
    height: DVH(3),
  },
  errorText: {
    color: colors.danger,
    marginTop: moderateScale(5),
  },
});
