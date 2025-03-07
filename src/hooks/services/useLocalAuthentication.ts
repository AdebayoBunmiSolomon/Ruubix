import { useEffect, useState } from "react";
import * as LocalAuthentication from "expo-local-authentication";
import { Alert } from "react-native";

export const useLocalAuthentication = () => {
  const [hasBiometrics, setHasBiometrics] = useState<boolean>(false);
  const [isBiometricSupported, setIsBiometricSupported] =
    useState<boolean>(false);
  const [isBiometricAuthenticated, setIsBiometricAuthenticated] =
    useState<boolean>(false);

  const checkBiometrics = async () => {
    const supported = await LocalAuthentication.hasHardwareAsync();
    setIsBiometricSupported(supported);

    if (supported) {
      const biometricsAvailable = await LocalAuthentication.isEnrolledAsync();
      setHasBiometrics(biometricsAvailable);
    }
  };

  const handleBiometricAuth = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate with biometrics",
        fallbackLabel: "Use Passcode", // Optional: Display a fallback button
      });

      if (result.success) {
        setIsBiometricAuthenticated(true);
        Alert.alert("Authentication Success", "You have been authenticated!");
        return {
          success: true,
        };
      } else {
        setIsBiometricAuthenticated(false);
        Alert.alert(
          "Authentication Failed",
          "Authentication was not successful."
        );
        return {
          success: false,
        };
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred during authentication.");
      return {
        success: false,
      };
    }
  };

  useEffect(() => {
    const initiateCheckBiometricSupported = async () => {
      await checkBiometrics();
    };
    initiateCheckBiometricSupported();
  }, []);

  return {
    handleBiometricAuth,
    hasBiometrics,
    isBiometricSupported,
    isBiometricAuthenticated,
  };
};
