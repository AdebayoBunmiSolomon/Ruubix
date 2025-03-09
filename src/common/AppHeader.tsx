import { CustomText } from "@src/components/shared";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { colors } from "@src/resources/colors/colors";
import { moderateScale } from "@src/resources/scaling";
import { AnimatedCircularProgress } from "react-native-circular-progress";

interface IAppHeaderProps {
  title: string;
  description?: string;
  onPressArrowBack: () => void;
  showGetHelp?: boolean;
  currStep?: number;
  totalStep?: number;
  showProgress?: boolean;
}

export const AppHeader: React.FC<IAppHeaderProps> = ({
  title,
  description,
  onPressArrowBack,
  showGetHelp,
  currStep,
  totalStep,
  showProgress,
}) => {
  const progress = (Number(currStep) / Number(totalStep)) * 100;
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
      <View style={styles.progressBarContainer}>
        <CustomText type='nunito-extrabold' size={27} black>
          {title}
        </CustomText>
        {showProgress && (
          <AnimatedCircularProgress
            size={moderateScale(40)}
            width={moderateScale(6)}
            fill={progress}
            tintColor={colors.black}
            backgroundColor='#E0E0E0'
            rotation={-90}
            lineCap='round'>
            {(_) => (
              <CustomText
                type='nunito-extrabold'
                size={12}
                black
                style={{
                  textAlign: "center",
                  justifyContent: "center",
                }}>
                {`${currStep}/${totalStep}`}
              </CustomText>
            )}
          </AnimatedCircularProgress>
        )}
      </View>
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
    paddingVertical: moderateScale(7),
    paddingHorizontal: moderateScale(10),
    backgroundColor: colors.paleRed,
    borderRadius: moderateScale(31),
  },
  topActionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  progressBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(20),
  },
});
