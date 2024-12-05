import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";
import { Provider } from "react-redux";
import { store } from "@/store";

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    "Gelasio-Regular": require("../assets/fonts/gelasio/Gelasio Regular 400.ttf"),
    "Gelasio-Medium": require("../assets/fonts/gelasio/Gelasio Medium 500.ttf"),
    "Gelasio-SemiBold": require("../assets/fonts/gelasio/Gelasio-SemiBold.ttf"),
    "Gelasio-Bold": require("../assets/fonts/gelasio/Gelasio Bold 700.ttf"),
    "MerriWeather-Regular": require("../assets/fonts/merryweather/Merriweather-Regular.ttf"),
    "MerriWeather-Bold": require("../assets/fonts/merryweather/Merriweather-Bold.ttf"),
    "NunitoSans-Regular": require("../assets/fonts/nuniSans/NunitoSans-Regular.ttf"),
    "NunitoSans-SemiBold": require("../assets/fonts/nuniSans/NunitoSans-SemiBold.ttf"),
    "NunitoSans-Bold": require("../assets/fonts/nuniSans/NunitoSans-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="auth/login" />
        <Stack.Screen name="auth/register" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name={"cart"} />
        <Stack.Screen name={"payment-success"} />
        <Stack.Screen name={"orders"} />
        <Stack.Screen name={"shipping-addresses"} />
        <Stack.Screen name={"payment-methods"} />
        <Stack.Screen name={"address"} />
      </Stack>
    </Provider>
  );
}
