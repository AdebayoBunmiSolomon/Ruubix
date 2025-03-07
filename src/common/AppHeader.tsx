import { CustomText } from "@src/components/shared";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { colors } from "@src/resources/colors/colors";
import { moderateScale } from "@src/resources/scaling";

interface IAppHeaderProps {
  title: string;
  description?: string;
  onPressArrowBack: () => void;
  showGetHelp?: boolean;
}

export const AppHeader: React.FC<IAppHeaderProps> = ({
  title,
  description,
  onPressArrowBack,
  showGetHelp,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topActionContainer}>
        <TouchableOpacity style={styles.arrowBtn} onPress={onPressArrowBack}>
          <ArrowLeft
            color={colors.black}
            size={moderateScale(25)}
            strokeWidth={2.5}
          />
        </TouchableOpacity>
        {showGetHelp && (
          <TouchableOpacity style={styles.getHelpBtn}>
            <CustomText type='nunito-bold' size={13} black>
              Get Help
            </CustomText>
          </TouchableOpacity>
        )}
      </View>
      <CustomText type='nunito-extrabold' size={28} black>
        {title}
      </CustomText>
      {description && (
        <CustomText
          type='nunito-regular'
          size={16}
          black
          style={{
            marginTop: moderateScale(-10),
          }}>
          {description}
        </CustomText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: moderateScale(15),
    paddingBottom: moderateScale(20),
  },
  arrowBtn: {
    padding: moderateScale(0),
  },
  getHelpBtn: {
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(15),
    backgroundColor: colors.paleRed,
    borderRadius: moderateScale(31),
  },
  topActionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
