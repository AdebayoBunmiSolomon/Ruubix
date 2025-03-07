import { fontFamily } from "@src/resources/fonts/font-family";
import { moderateScale, DVW } from "@src/resources/scaling";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TextStyle,
  StyleProp,
  ViewStyle,
} from "react-native";

interface OTPInputProps {
  onComplete: (otp: string) => void;
  numberOfInput?: number;
  inputStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

export const OTPInput = ({
  onComplete,
  numberOfInput = 4,
  containerStyle,
  inputStyle,
}: OTPInputProps) => {
  const [otp, setOtp] = useState<string[]>(Array(numberOfInput).fill(""));
  const inputRefs = useRef<TextInput[]>([]);

  useEffect(() => {
    setOtp(Array(numberOfInput).fill(""));
  }, [numberOfInput]);

  const handleChange = (text: string, index: number) => {
    if (text.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < numberOfInput - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (
      newOtp.every((digit) => digit !== "") &&
      newOtp.join("").length === numberOfInput
    ) {
      onComplete(newOtp.join(""));
    }
  };

  const handleKeyPress = (event: any, index: number) => {
    if (event.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {otp.map((char, index) => (
        <View key={index} style={styles.inputWrapper}>
          <TextInput
            ref={(ref) => (inputRefs.current[index] = ref!)}
            style={[styles.input, inputStyle]}
            maxLength={1}
            keyboardType='numeric'
            value={char}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(event) => handleKeyPress(event, index)}
            placeholder=''
            secureTextEntry={false} // Hide default dots
          />
          <View style={styles.overlay}>
            <TextInput
              value={char ? "*" : ""}
              editable={false}
              style={styles.overlayInput}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  inputWrapper: {
    position: "relative",
  },
  input: {
    width: 72,
    height: 72,
    borderWidth: DVW(0.4),
    borderColor: "#e5e7eb",
    borderRadius: 8,
    textAlign: "center",
    fontSize: moderateScale(24),
    fontFamily: fontFamily.nunito_extrabold,
    backgroundColor: "#ffffff",
    color: "transparent", // Hide real input text
    justifyContent: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  overlayInput: {
    fontSize: moderateScale(28),
    fontFamily: fontFamily.nunito_extrabold,
    color: "#000", // Show asterisks instead of dots
    justifyContent: "center",
    alignItems: "center",
  },
});
