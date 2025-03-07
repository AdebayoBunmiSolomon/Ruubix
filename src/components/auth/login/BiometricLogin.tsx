import { moderateScale } from "@src/resources/scaling";
import React, { useEffect } from "react";
import { View, StyleSheet, Modal, Alert } from "react-native";
import { Fingerprint } from "lucide-react-native";
import { colors } from "@src/resources/colors/colors";
import { DVH } from "@src/resources/scaling";
import { CustomText, CustomButton } from "@src/components/shared";

interface IBiometricLoginProps {
  visible: boolean;
  setIsVisible: () => void;
  biometricAuthenticated: boolean;
}

export const BiometricLogin: React.FC<IBiometricLoginProps> = ({
  visible,
  setIsVisible,
  biometricAuthenticated,
}) => {
  useEffect(() => {
    if (biometricAuthenticated) {
      setIsVisible();
    }
  }, [biometricAuthenticated]);
  return (
    <Modal
      visible={visible}
      transparent
      animationType='fade'
      onRequestClose={() => setIsVisible()}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContentContainer}>
          <Fingerprint
            color={colors.black}
            size={moderateScale(40)}
            height={DVH(10)}
          />
          <CustomText type='nunito-regular' size={16} black>
            Use Biometrics
          </CustomText>
          <CustomText
            type='nunito-regular'
            size={13}
            style={{
              color: "#49454F",
              paddingVertical: moderateScale(5),
            }}>
            To open app
          </CustomText>
          <CustomButton
            title='Use Password'
            textType='nunito-semibold'
            textSize={16}
            onPress={() => setIsVisible()}
            buttonType='Solid'
            bgBlack
            textWhite
            style={styles.actionBtn}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.modalBg,
  },
  modalContentContainer: {
    width: "85%",
    paddingVertical: moderateScale(15),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(25),
    backgroundColor: colors.white,
  },
  actionBtn: {
    paddingVertical: moderateScale(12),
    marginVertical: moderateScale(20),
    width: "90%",
  },
});
