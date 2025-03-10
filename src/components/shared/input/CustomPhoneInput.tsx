import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ColorValue,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
  TextStyle,
} from "react-native";
import { CustomText } from "../text/CustomText";
import { DVH, DVW, moderateScale } from "@src/resources/scaling";
import { colors } from "@src/resources/colors/colors";
import { fontFamily } from "@src/resources/fonts/font-family";
import { textType } from "../text/CustomText";
import { countries } from "@src/constants/countries";
import { ChevronDown } from "lucide-react-native";
import { useEnteredPhoneNumberStore } from "@src/hooks/store";

interface ICustomPhoneInputProps {
  dial_code?: string;
  number?: string;
  flag?: string;
  disabled?: boolean;
  multiLine?: boolean;
  maxLength?: number;
  placeholder: string;
  title?: string;
  titleType?: textType;
  titleColor?: ColorValue;
  value?: any;
  onChangeText: (value: any) => void;
  error?: string;
  showErrorText?: boolean;
  style?: StyleProp<ViewStyle>;
  valueFontType?: textType;
  titleStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  onSubmitEditing?: () => void;
}

type SelectedCountryType = {
  name: string;
  dial_code: string;
  flag: string;
};

export const CustomPhoneInput: React.FC<ICustomPhoneInputProps> = ({
  dial_code,
  number,
  flag,
  disabled,
  multiLine,
  maxLength,
  placeholder,
  title,
  titleType,
  titleColor,
  value,
  onChangeText,
  error,
  showErrorText,
  style,
  valueFontType,
  titleStyle,
  inputStyle,
  onSubmitEditing,
}) => {
  const { setEnteredPhoneNumber, enteredPhoneNumber } =
    useEnteredPhoneNumberStore();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<SelectedCountryType>({
    name: countries[0].name,
    flag: countries[0].flag,
    dial_code: countries[0].dialCode,
  });

  const renderValueFontType = () => {
    return valueFontType === "mulish-bold"
      ? fontFamily.mulish_bold
      : valueFontType === "mulish-semibold"
      ? fontFamily.mulish_semibold
      : valueFontType === "mulish-medium"
      ? fontFamily.mulish_medium
      : valueFontType === "mulish-regular"
      ? fontFamily.mulish_regular
      : valueFontType === "mulish-light"
      ? fontFamily.mulish_light
      : valueFontType === "nunito-bold"
      ? fontFamily.nunito_bold
      : valueFontType === "nunito-semibold"
      ? fontFamily.nunito_semibold
      : valueFontType === "nunito-medium"
      ? fontFamily.nunito_medium
      : valueFontType === "nunito-regular"
      ? fontFamily.nunito_regular
      : valueFontType === "nunito-light"
      ? fontFamily.nunito_light
      : undefined;
  };

  const getBorderColor = () => (error ? colors.danger : "#d3cacaf5");

  return (
    <>
      <View style={styles.container}>
        <CustomText
          size={14}
          type={titleType ? titleType : "nunito-medium"}
          style={[
            {
              color: titleColor,
            },
            styles.title,
            titleStyle,
          ]}>
          {title ? title : "Phone number"}
        </CustomText>
        <View
          style={[
            {
              flexDirection: "row",
              alignItems: "center",
              gap: moderateScale(10),
            },
          ]}>
          <TouchableOpacity
            disabled={disabled}
            onPress={() => setModalVisible(!modalVisible)}
            style={[
              styles.flagBtn,
              {
                borderColor: getBorderColor(),
              },
              style,
            ]}>
            <CustomText type='nunito-semibold' size={20}>
              {flag || selectedCountry.flag}
            </CustomText>
            <ChevronDown
              color={colors.black}
              size={moderateScale(20)}
              strokeWidth={DVW(0.6)}
            />
          </TouchableOpacity>
          <View
            style={[
              styles.inputWrapper,
              { borderColor: getBorderColor() },
              style,
            ]}>
            <CustomText
              type={"mulish-regular"}
              size={14}
              black
              style={{
                paddingHorizontal: moderateScale(5),
              }}>
              {dial_code || selectedCountry.dial_code}
            </CustomText>
            <TextInput
              onSubmitEditing={onSubmitEditing}
              placeholder={placeholder}
              value={`${value}`}
              onChangeText={(text) => {
                onChangeText(text);
                setEnteredPhoneNumber({
                  ...enteredPhoneNumber,
                  number: text,
                });
              }}
              style={[
                {
                  width: "100%",
                  height: "100%",
                  textAlignVertical: multiLine ? "top" : "center",
                  fontFamily: renderValueFontType(),
                },
                inputStyle,
              ]}
              keyboardType={"phone-pad"}
              placeholderTextColor={colors.darkGrey}
              maxLength={maxLength}
              editable={disabled ? false : true}
              multiline={multiLine}
            />
          </View>
        </View>
        {showErrorText && error && (
          <CustomText size={12} type='nunito-regular' style={styles.errorText}>
            {error}
          </CustomText>
        )}
      </View>
      <Modal
        visible={modalVisible}
        transparent
        animationType='fade'
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <CustomText
              size={16}
              type='nunito-semibold'
              style={styles.modalHeader}>
              Select an Option
            </CustomText>
            <FlatList
              data={countries}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    setSelectedCountry({
                      ...selectedCountry,
                      flag: item?.flag,
                      dial_code: item?.dialCode,
                      name: item?.name,
                    });
                    setEnteredPhoneNumber({
                      ...enteredPhoneNumber,
                      dial_code: item?.dialCode,
                      flag: item?.flag,
                    });
                    setModalVisible(false);
                  }}>
                  <CustomText size={14} type='nunito-regular'>
                    {item.flag} {item.name}
                  </CustomText>
                  <CustomText size={14} type='nunito-regular'>
                    {item.dialCode}
                  </CustomText>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}>
              <CustomText
                size={14}
                type='nunito-bold'
                style={{
                  color: colors.danger,
                }}>
                Close
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
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
    width: "75.5%",
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    height: "40%",
    backgroundColor: "white",
    borderRadius: moderateScale(10),
    padding: moderateScale(20),
  },
  modalHeader: {
    marginBottom: moderateScale(10),
    textAlign: "center",
  },
  option: {
    paddingVertical: moderateScale(10),
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  flag: {
    marginRight: moderateScale(10),
  },
  closeButton: {
    marginTop: moderateScale(10),
    alignSelf: "center",
    padding: moderateScale(5),
  },
  flagBtn: {
    height: DVH(7),
    borderWidth: DVW(0.2),
    backgroundColor: "#F5F5F5",
    justifyContent: "space-around",
    alignItems: "center",
    width: DVW(20),
    paddingHorizontal: moderateScale(5),
    borderRadius: moderateScale(10),
    overflow: "hidden",
    flexDirection: "row",
  },
});
