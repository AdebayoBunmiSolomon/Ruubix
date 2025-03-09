import React, { useState } from "react";
import {
  KeyboardType,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  FlatList,
  StyleProp,
  ViewStyle,
  ColorValue,
  TextStyle,
  Pressable,
} from "react-native";
import { DVH, DVW, moderateScale } from "@src/resources/scaling";
import { CustomText, textType } from "../text/CustomText";
import { colors } from "@src/resources/colors/colors";
import { fontFamily } from "@src/resources/fonts/font-family";
import { MaterialIcons, FontAwesome, Feather } from "@expo/vector-icons";
import { useCustomInput } from "../hooks";

export type InputType = "dropdown" | "password" | "custom";

interface BaseProps {
  maxLength?: number;
  type: InputType;
  placeholder: string;
  title?: string;
  titleType?: textType;
  titleColor?: ColorValue;
  value?: any;
  onChangeText?: (value: any) => void;
  error?: string;
  showErrorText?: boolean;
  style?: StyleProp<ViewStyle>;
  valueFontType?: textType;
  titleStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  onSubmitEditing?: () => void;
}

interface DropdownProps extends BaseProps {
  type: "dropdown";
  dropDownItems: string[];
  onSelectDropDownItem: (value: string) => void;
}

interface PasswordProps extends BaseProps {
  type: "password";
}

interface CustomProps extends BaseProps {
  type: "custom";
  keyboardType?: KeyboardType;
  disabled?: boolean;
  multiLine?: boolean;
  searchInput?: boolean;
}

type CustomInputProps = DropdownProps | PasswordProps | CustomProps;

export const CustomInput: React.FC<CustomInputProps> = (props) => {
  const {
    type,
    title,
    titleType,
    titleColor,
    placeholder,
    value,
    onChangeText,
    error,
    showErrorText,
    maxLength,
    style,
    valueFontType,
    titleStyle,
    inputStyle,
    onSubmitEditing,
  } = props;

  const [seePassword, setSeePassword] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const { getInputColor } = useCustomInput();
  const { borderColor, iconColor } = getInputColor(error || "");

  const renderError = () =>
    showErrorText && error ? (
      <CustomText size={12} type='nunito-regular' style={styles.errorText}>
        {error}
      </CustomText>
    ) : null;

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

  const renderDropdown = () => {
    const { dropDownItems, onSelectDropDownItem } = props as DropdownProps;

    return (
      <>
        <Pressable
          onPress={() => setModalVisible(true)}
          style={[
            styles.inputWrapper,
            {
              borderColor,
              flexDirection: "row",
              alignItems: "center",
              height: DVH(7),
            },
            style,
          ]}>
          <TextInput
            pointerEvents='none'
            placeholder={placeholder}
            value={value}
            editable={false}
            style={[
              {
                width: "90%",
                height: "100%",
                fontFamily: renderValueFontType(),
              },
              inputStyle,
            ]}
            placeholderTextColor={colors.darkGrey}
            onChangeText={onChangeText}
          />
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.iconButton}>
            <MaterialIcons
              name='keyboard-arrow-down'
              size={moderateScale(27)}
              color={iconColor}
            />
          </TouchableOpacity>
        </Pressable>
        {renderError()}
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
                data={dropDownItems}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.option}
                    onPress={() => {
                      onSelectDropDownItem(item);
                      setModalVisible(false);
                    }}>
                    <CustomText size={14} type='nunito-regular'>
                      {item}
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

  const renderPasswordInput = () => (
    <>
      <View
        style={[
          styles.inputWrapper,
          {
            borderColor,
            flexDirection: "row",
            alignItems: "center",
            height: DVH(7),
          },
          style,
        ]}>
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          style={[
            {
              width: "90%",
              height: "100%",
              fontFamily: renderValueFontType(),
            },
            inputStyle,
          ]}
          secureTextEntry={seePassword}
          placeholderTextColor={colors.darkGrey}
        />
        <TouchableOpacity
          onPress={() => setSeePassword(!seePassword)}
          style={styles.iconButton}>
          <FontAwesome
            name={seePassword ? "eye-slash" : "eye"}
            size={moderateScale(20)}
            color={iconColor}
          />
        </TouchableOpacity>
      </View>
      {renderError()}
    </>
  );

  const renderCustomInput = () => {
    const { keyboardType, disabled, multiLine, searchInput } =
      props as CustomProps;

    return (
      <>
        <View
          style={[
            styles.inputWrapper,
            {
              borderColor,
              height: multiLine ? DVH(20) : DVH(7),
              flexDirection: searchInput ? "row" : undefined,
              alignItems: searchInput ? "center" : undefined,
              gap: searchInput ? moderateScale(5) : undefined,
            },
            style,
          ]}>
          {searchInput && (
            <Feather
              name='search'
              color={borderColor}
              size={moderateScale(23)}
            />
          )}
          <TextInput
            onSubmitEditing={onSubmitEditing}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            style={[
              {
                width: searchInput ? "90%" : "100%",
                height: "100%",
                textAlignVertical: multiLine ? "top" : "center",
                fontFamily: renderValueFontType(),
              },
              inputStyle,
            ]}
            keyboardType={keyboardType}
            placeholderTextColor={colors.darkGrey}
            maxLength={maxLength}
            editable={disabled ? false : true}
            multiline={multiLine}
          />
        </View>
        {renderError()}
      </>
    );
  };

  const renderInput = () => {
    switch (type) {
      case "dropdown":
        return renderDropdown();
      case "password":
        return renderPasswordInput();
      case "custom":
        return renderCustomInput();
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <CustomText
        size={14}
        type={titleType ? titleType : "nunito-medium"}
        style={[
          {
            color: titleColor || styles?.title.color,
          },
          titleStyle,
        ]}>
        {title}
      </CustomText>
      {renderInput()}
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
    borderWidth: DVW(0.2),
    backgroundColor: "#F5F5F5",
    borderRadius: moderateScale(10),
    width: "100%",
    paddingHorizontal: moderateScale(12),
    overflow: "hidden",
  },
  iconButton: {
    padding: moderateScale(10),
    flexDirection: "row",
    alignItems: "center",
  },
  errorText: {
    marginBottom: moderateScale(5),
    color: colors.danger,
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
  },
  flag: {
    marginRight: moderateScale(10),
  },
  countryText: {
    marginLeft: moderateScale(10),
  },
  closeButton: {
    marginTop: moderateScale(10),
    alignSelf: "center",
  },
});
