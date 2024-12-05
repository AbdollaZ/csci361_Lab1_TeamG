import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { NunitoSansText } from "@/components/fonts";

const PaymentMethods = () => {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <NunitoSansText>PaymentMethods</NunitoSansText>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
});

export default PaymentMethods;
