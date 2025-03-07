import React from "react";
import { View, StyleSheet } from "react-native";
import { AntDesign, Octicons } from "@expo/vector-icons";
import { CustomText } from "@src/components/shared";
import { moderateScale } from "@src/resources/scaling";
import { colors } from "@src/resources/colors/colors";

interface IPasswordRequirementProps {
  label: string;
  isMet: boolean;
}

export const PasswordRequirement: React.FC<IPasswordRequirementProps> = ({
  label,
  isMet,
}) => {
  return (
    <View style={styles.passwordOptions}>
      {isMet ? (
        <AntDesign
          name='checkcircle'
          size={moderateScale(12)}
          color={colors.black}
        />
      ) : (
        <AntDesign
          name='checkcircle'
          size={moderateScale(12)}
          color={"#C7C7C7"}
        />
      )}
      <CustomText
        type='nunito-regular'
        size={13}
        style={{ color: colors.black }}>
        {label}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  passwordOptions: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(5),
  },
});
