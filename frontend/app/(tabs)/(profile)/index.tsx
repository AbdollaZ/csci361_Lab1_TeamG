import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import SectionItem from "@/components/ui/SectionItem";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderBack } from "@/components/ui/Header";
import Ionicons from "@expo/vector-icons/Ionicons";
import UserInfo from "@/components/ui/UserInfo";
import { useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/store";
import { logout } from "@/store/slices/auth";

export default function ProfileScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onLogout = () => {
    router.replace("/auth/login");
    dispatch(logout());
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <HeaderBack
        style={styles.header}
        title={"Profile"}
        rightElement={
          <TouchableOpacity onPress={onLogout} style={styles.logout}>
            <Ionicons
              name={"log-out-outline"}
              size={24}
              color={Colors.raisinBlack}
            />
          </TouchableOpacity>
        }
      />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <UserInfo style={styles.info} />
        <View style={styles.sections}>
          <SectionItem
            label={"My orders"}
            value={"Already have 10 orders"}
            style={styles.section}
            onPress={() => router.navigate("/orders")}
          />
          <SectionItem
            label={"Shipping Addresses"}
            value={"03 Addresses"}
            style={styles.section}
            onPress={() => router.navigate("/shipping-addresses")}
          />
          {/*<SectionItem*/}
          {/*  label={"Payment Method"}*/}
          {/*  value={"You have 2 cards"}*/}
          {/*  style={styles.section}*/}
          {/*  onPress={() => router.navigate("/payment-methods")}*/}
          {/*/>*/}
          {/*<SectionItem*/}
          {/*  label={"My reviews"}*/}
          {/*  value={"Reviews for 5 items"}*/}
          {/*  style={styles.section}*/}
          {/*/>*/}
          <SectionItem
            label={"Setting"}
            value={"Notification, Password, FAQ, Contact"}
            style={styles.section}
            onPress={() => router.navigate("/(tabs)/(profile)/settings")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    paddingHorizontal: 20,
  },
  scrollView: {
    paddingHorizontal: 20,
  },
  info: {
    marginVertical: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  sections: {
    gap: 15,
  },
  section: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 0,
    borderWidth: 0,
    backgroundColor: Colors.white,
    shadowColor: "#000", // Цвет тени
    shadowOffset: { width: 0, height: 10 }, // Смещение тени
    shadowOpacity: 0.1, // Прозрачность тени
    shadowRadius: 10, // Радиус размытия тени
    elevation: 5, // Для Android — добавляет тень с использованием elevation
  },
  logout: {
    padding: 20,
    margin: -20,
  },
});
