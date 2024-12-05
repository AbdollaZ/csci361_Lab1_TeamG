import React from "react";
import { StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { MerriWeatherText, NunitoSansText } from "@/components/fonts";
import Ionicons from "@expo/vector-icons/Ionicons";
import Button from "@/components/ui/Button";
import { useRouter } from "expo-router";

const PaymentSuccess = () => {
  const router = useRouter();
  const onTrack = () => {};
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <MerriWeatherText type={"bold"} style={styles.title}>
        Success
      </MerriWeatherText>
      <Image
        source={require("../assets/images/delivery-farm.png")}
        resizeMode={"contain"}
        style={styles.image}
      />
      <Ionicons name={"checkmark-circle"} size={50} color={Colors.crayola} />
      <NunitoSansText style={styles.description}>
        Your order will be delivered soon. Thank you for choosing our app!
      </NunitoSansText>
      <Button
        title={"Track your orders"}
        onPress={() => router.navigate("orders")}
        style={styles.button1}
      />
      <Button
        title={"Back to home"}
        titleStyle={{
          textTransform: "uppercase",
        }}
        type={"outline"}
        onPress={() => router.replace("home")}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 36,
    color: Colors.darkCharcoal,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    aspectRatio: 1.5,
    marginBottom: 5,
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    lineHeight: 40,
    color: Colors.graniteGray,
    marginVertical: 40,
  },
  button1: {
    marginBottom: 25,
  },
});

export default PaymentSuccess;
