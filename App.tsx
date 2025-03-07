import { useFontLoading } from "@src/hooks/services";
import { Router } from "@src/router/router";
import { AppLoader } from "@src/screens/App-Loader";
import { StyleSheet, View } from "react-native";

export default function App() {
  const { isFontLoadingComplete } = useFontLoading();

  return (
    <View style={styles.container}>
      {isFontLoadingComplete ? (
        <Router isAuthenticated={false} />
      ) : (
        <AppLoader />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
