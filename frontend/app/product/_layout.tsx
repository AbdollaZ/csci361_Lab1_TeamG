import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name={"product/[id]"} />
      <Stack.Screen name={"check-out"} />
      <Stack.Screen name={"payment-success"} />
    </Stack>
  );
}
